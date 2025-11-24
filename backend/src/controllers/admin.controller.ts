// @ts-nocheck
import { LeadStatus, PainterStatus } from '../types/enums';
import type { Lead, Painter as PainterModel, Prisma } from '@prisma/client';
import type { Request, Response } from 'express';

import { prisma } from '../lib/prisma';
import { sendError, sendSuccess } from '../utils/http';
import { sendNotification } from '../utils/notifications';
import { painterApprovalTemplate } from '../utils/templates';

type AdminLeadPayload = {
  id: string;
  name: string;
  status: LeadStatus;
  serviceType: string;
  address: string;
  pincode: string;
  phone: string;
  email: string;
  preferredDate: string | null;
  createdAt: string;
  notes: string | null;
  areaEstimate: string | null;
};

type AdminPainterPayload = {
  id: string;
  fullName: string;
  city: string;
  email: string;
  phone: string;
  status: PainterStatus;
  yearsExperience: number;
  expectedRate: string | null;
  skills: string[];
  submittedAt: string;
  adminNotes: string | null;
};

export type AdminDashboardPayload = {
  summary: {
    totalLeads: number;
    leadsToday: number;
    scheduledVisits: number;
    conversionRate: number;
    avgResponseHours: number;
  };
  leadStatus: Array<{
    status: LeadStatus;
    count: number;
    weekChange: number;
  }>;
  painterSummary: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    newThisWeek: number;
  };
  upcomingAppointments: Array<{
    id: string;
    clientName: string;
    scheduledFor: string;
    address: string;
    status: string;
    painterAssigned: string | null;
  }>;
  teamActivity: Array<{
    id: string;
    title: string;
    timestamp: string;
    category: string;
    description: string;
  }>;
  alerts: Array<{
    id: string;
    message: string;
    severity: 'info' | 'warning' | 'critical';
  }>;
  recentLeads: AdminLeadPayload[];
  painterApplications: AdminPainterPayload[];
};

const startOfDay = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const startOfWeek = (date: Date) => {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = copy.getDate() - day + (day === 0 ? -6 : 1);
  copy.setDate(diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const toMap = <T extends string>(entries: Array<{ status: T; _count: { _all: number } }>) => {
  const store = new Map<T, number>();
  entries.forEach((entry) => store.set(entry.status, entry._count._all));
  return store;
};

const averageResponseHours = (diffs: number[]) => {
  if (!diffs.length) return 0;
  const avg = diffs.reduce((total, current) => total + current, 0) / diffs.length;
  return Number((avg / (1000 * 60 * 60)).toFixed(1));
};

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry)).filter(Boolean);
  }

  if (value && typeof value === 'object') {
    return Object.values(value as Record<string, unknown>)
      .map((entry) => String(entry))
      .filter(Boolean);
  }

  return [];
};

const serializeLeadForAdmin = (lead: Lead): AdminLeadPayload => ({
  id: lead.id,
  name: lead.name,
  status: lead.status,
  serviceType: lead.service_type,
  address: lead.address,
  pincode: lead.pincode,
  phone: lead.phone,
  email: lead.email,
  preferredDate: lead.preferred_date ? lead.preferred_date.toISOString() : null,
  createdAt: lead.created_at.toISOString(),
  notes: lead.notes ?? null,
  areaEstimate: lead.area_estimate ?? null
});

const serializePainterForAdmin = (painter: PainterModel): AdminPainterPayload => ({
  id: painter.id,
  fullName: painter.full_name,
  city: painter.city,
  email: painter.email,
  phone: painter.phone,
  status: painter.status,
  yearsExperience: painter.years_experience,
  expectedRate: painter.expected_rate ?? null,
  skills: toStringArray(painter.skills),
  submittedAt: painter.created_at.toISOString(),
  adminNotes: painter.admin_notes ?? null
});

const describeAuditMetadata = (metadata: unknown, fallback: string) => {
  if (!metadata || typeof metadata !== 'object') {
    return fallback;
  }

  const pairs = Object.entries(metadata as Record<string, unknown>)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(' • ');

  return pairs || fallback;
};

export const getAdminDashboard = async (_req: Request, res: Response) => {
  const now = new Date();
  const today = startOfDay(now);
  const weekStart = startOfWeek(now);
  const previousWeekStart = new Date(weekStart.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalLeads,
    leadsToday,
    scheduledVisits,
    completedLeads,
    leadStatusTotals,
    leadStatusWeek,
    leadStatusPreviousWeek,
    painterStatuses,
    totalPainters,
    newPaintersThisWeek,
    approvedPainters,
    responseSamples,
    upcomingAppointments,
    auditLogs,
    latestLeads,
    painterPipeline
  ] =
    await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { created_at: { gte: today } } }),
      prisma.lead.count({ where: { status: LeadStatus.scheduled } }),
      prisma.lead.count({ where: { status: LeadStatus.completed } }),
      prisma.lead.groupBy({ by: ['status'], _count: { _all: true } }),
      prisma.lead.groupBy({
        by: ['status'],
        _count: { _all: true },
        where: { created_at: { gte: weekStart } }
      }),
      prisma.lead.groupBy({
        by: ['status'],
        _count: { _all: true },
        where: { created_at: { gte: previousWeekStart, lt: weekStart } }
      }),
      prisma.painter.groupBy({ by: ['status'], _count: { _all: true } }),
      prisma.painter.count(),
      prisma.painter.count({ where: { created_at: { gte: weekStart } } }),
      prisma.painter.findMany({ where: { status: PainterStatus.approved }, orderBy: { updated_at: 'desc' }, take: 5 }),
      prisma.lead.findMany({
        where: { status: { in: [LeadStatus.contacted, LeadStatus.scheduled, LeadStatus.completed] } },
        select: { created_at: true, updated_at: true },
        orderBy: { updated_at: 'desc' },
        take: 50
      }),
      prisma.lead.findMany({
        where: { status: LeadStatus.scheduled, preferred_date: { not: null, gte: today } },
        orderBy: { preferred_date: 'asc' },
        take: 5
      }),
      prisma.auditLog.findMany({
        include: { admin: true },
        orderBy: { createdAt: 'desc' },
        take: 6
      }),
      prisma.lead.findMany({ orderBy: { created_at: 'desc' }, take: 10 }),
      prisma.painter.findMany({ orderBy: { created_at: 'desc' }, take: 10 })
    ]);

  const totalsMap = toMap(leadStatusTotals);
  const weekMap = toMap(leadStatusWeek);
  const prevWeekMap = toMap(leadStatusPreviousWeek);

  const leadStatus = Object.values(LeadStatus).map((status) => ({
    status,
    count: totalsMap.get(status) ?? 0,
    weekChange: (weekMap.get(status) ?? 0) - (prevWeekMap.get(status) ?? 0)
  }));

  const painterStatusMap = toMap(painterStatuses as Array<{ status: PainterStatus; _count: { _all: number } }>);
  const pending = painterStatusMap.get(PainterStatus.pending) ?? 0;
  const approved = painterStatusMap.get(PainterStatus.approved) ?? 0;
  const rejected = painterStatusMap.get(PainterStatus.rejected) ?? 0;

  const responseDiffs = responseSamples
    .map((sample) => sample.updated_at.getTime() - sample.created_at.getTime())
    .filter((diff) => diff >= 0);

  const conversionRate = totalLeads ? Number(((completedLeads / totalLeads) * 100).toFixed(1)) : 0;
  const avgResponseHours = averageResponseHours(responseDiffs);

  const appointments = upcomingAppointments.map((lead, index) => ({
    id: lead.id,
    clientName: lead.name,
    scheduledFor: (lead.preferred_date ?? new Date()).toISOString(),
    address: lead.address,
    status: lead.status,
    painterAssigned: approvedPainters[index % Math.max(approvedPainters.length, 1)]?.full_name ?? null
  }));

  const teamActivity = auditLogs.length
    ? auditLogs.map((log) => ({
      id: log.id,
      title: log.action,
      timestamp: log.createdAt.toISOString(),
      category: log.entity,
      description: describeAuditMetadata(log.metadata, `Handled by ${log.admin?.name ?? 'system'}`)
    }))
    : [];

  const alerts: AdminDashboardPayload['alerts'] = [];

  if (pending >= 5) {
    alerts.push({ id: 'alert-painters', message: `${pending} painter applications awaiting review.`, severity: 'warning' });
  }

  if (conversionRate < 30 && totalLeads > 10) {
    alerts.push({ id: 'alert-conversion', message: 'Lead conversion is below 30%. Review follow-up SLAs.', severity: 'critical' });
  }

  if (!appointments.length && scheduledVisits > 0) {
    alerts.push({ id: 'alert-appointments', message: 'Scheduled leads do not have upcoming visit dates captured.', severity: 'info' });
  }

  if (!alerts.length) {
    alerts.push({ id: 'alert-ok', message: 'Operations stable. No critical alerts right now.', severity: 'info' });
  }

  const recentLeads = latestLeads.map(serializeLeadForAdmin);
  const painterApplications = painterPipeline.map(serializePainterForAdmin);

  const payload: AdminDashboardPayload = {
    summary: {
      totalLeads,
      leadsToday,
      scheduledVisits,
      conversionRate,
      avgResponseHours
    },
    leadStatus,
    painterSummary: {
      total: totalPainters,
      pending,
      approved,
      rejected,
      newThisWeek: newPaintersThisWeek
    },
    upcomingAppointments: appointments,
    teamActivity,
    alerts,
    recentLeads,
    painterApplications
  };

  return sendSuccess(res, payload, 'Admin dashboard fetched');
};

export const listAdminLeads = async (req: Request, res: Response) => {
  const statusParam = req.query.status ? String(req.query.status) : undefined;
  const limit = Math.min(Number(req.query.limit ?? 10) || 10, 50);

  const where: Prisma.LeadWhereInput = {};

  if (statusParam) {
    if (!Object.values(LeadStatus).includes(statusParam as LeadStatus)) {
      return sendError(res, new Error('Invalid lead status filter'), 400);
    }
    where.status = statusParam as LeadStatus;
  }

  const [total, leads] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.findMany({ where, orderBy: { created_at: 'desc' }, take: limit })
  ]);

  return sendSuccess(
    res,
    {
      items: leads.map(serializeLeadForAdmin),
      total
    },
    'Admin leads fetched'
  );
};

export const updateAdminLeadStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body as { status?: string; notes?: string };

  if (!status || !Object.values(LeadStatus).includes(status as LeadStatus)) {
    return sendError(res, new Error('Invalid lead status'), 400);
  }

  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: {
        status: status as LeadStatus,
        notes: notes ?? null
      }
    });

    await prisma.auditLog.create({
      data: {
        action: 'Lead status updated',
        entity: 'Lead',
        entityId: lead.id,
        metadata: {
          status: lead.status,
          notes: notes ?? undefined
        }
      }
    });

    return sendSuccess(res, serializeLeadForAdmin(lead), 'Lead status updated');
  } catch (error) {
    return sendError(res, error, 400);
  }
};

export const listAdminPainters = async (req: Request, res: Response) => {
  const statusParam = req.query.status ? String(req.query.status) : undefined;
  const limit = Math.min(Number(req.query.limit ?? 10) || 10, 50);

  const where: Prisma.PainterWhereInput = {};

  if (statusParam) {
    if (!Object.values(PainterStatus).includes(statusParam as PainterStatus)) {
      return sendError(res, new Error('Invalid painter status filter'), 400);
    }
    where.status = statusParam as PainterStatus;
  }

  const [total, painters] = await Promise.all([
    prisma.painter.count({ where }),
    prisma.painter.findMany({ where, orderBy: { created_at: 'desc' }, take: limit })
  ]);

  return sendSuccess(
    res,
    {
      items: painters.map(serializePainterForAdmin),
      total
    },
    'Admin painters fetched'
  );
};

export const updateAdminPainterStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body as { status?: string; notes?: string };

  if (!status || !Object.values(PainterStatus).includes(status as PainterStatus)) {
    return sendError(res, new Error('Invalid painter status'), 400);
  }

  try {
    const painter = await prisma.painter.update({
      where: { id },
      data: {
        status: status as PainterStatus,
        admin_notes: notes ?? null
      }
    });

    await prisma.auditLog.create({
      data: {
        action: 'Painter status updated',
        entity: 'Painter',
        entityId: painter.id,
        metadata: {
          status: painter.status,
          notes: notes ?? undefined
        }
      }
    });

    await sendNotification({
      toEmail: painter.email,
      subject: `Your Master Brush status: ${painter.status}`,
      html: painterApprovalTemplate(painter.full_name, painter.status, notes ?? undefined),
      text: `Your Master Brush status is now ${painter.status}`,
      toPhone: painter.phone
    }).catch(() => undefined);

    return sendSuccess(res, serializePainterForAdmin(painter), 'Painter status updated');
  } catch (error) {
    return sendError(res, error, 400);
  }
};

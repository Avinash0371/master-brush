import { Prisma } from '@prisma/client';
import { stringify } from 'csv-stringify/sync';
import type { Request, Response } from 'express';

import { prisma } from '../lib/prisma';
import { sendSuccess } from '../utils/http';
import { buildMeta, buildPagination } from '../utils/pagination';
import { sendQuoteConfirmation, sendAdminNewLeadNotification } from '../services/email.service';

import { z } from 'zod';

const createLeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  pincode: z.string().min(6, 'Pincode must be 6 digits'),
  address: z.string().min(1, 'Address is required'),
  service_type: z.string().min(1, 'Service type is required'),
  area_estimate: z.string().optional().nullable(),
  preferred_date: z.string().optional().nullable(),
  color_pref: z.array(z.string()).optional(),
  notes: z.string().optional().nullable(),
  status: z.string().optional()
});

export const createLead = async (req: Request, res: Response, next: Function) => {
  try {
    const validatedData = createLeadSchema.parse(req.body);

    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email,
        pincode: validatedData.pincode,
        address: validatedData.address,
        service_type: validatedData.service_type,
        area_estimate: validatedData.area_estimate ?? null,
        preferred_date: validatedData.preferred_date ? new Date(validatedData.preferred_date) : null,
        color_pref: validatedData.color_pref ? JSON.stringify(validatedData.color_pref) : null,
        notes: validatedData.notes ?? null,
        status: (validatedData.status as any) ?? undefined
      }
    });

    // Send emails in background (non-blocking)
    console.log('🔔 Sending emails for new lead...');

    // Send confirmation email to customer (fire and forget)
    sendQuoteConfirmation({
      name: lead.name,
      email: lead.email,
      service_type: lead.service_type,
      pincode: lead.pincode
    }).catch(err => {
      console.error('❌ Failed to send quote confirmation:', err);
    });

    // Send notification to admin (fire and forget)
    sendAdminNewLeadNotification({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      service_type: lead.service_type,
      pincode: lead.pincode,
      address: lead.address
    }).catch(err => {
      console.error('❌ Failed to send admin notification:', err);
    });

    return sendSuccess(res, lead, 'Lead captured', 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors
      });
    }
    next(error);
  }
};

export const listLeads = async (req: Request, res: Response) => {
  const { page, limit, skip } = buildPagination(req.query);
  const statusParam = req.query.status ? String(req.query.status) : undefined;
  const validStatuses = ['new', 'contacted', 'scheduled', 'completed'];
  const status = statusParam && validStatuses.includes(statusParam)
    ? statusParam
    : undefined;

  const where: Prisma.LeadWhereInput = {
    status,
    pincode: req.query.pincode ? String(req.query.pincode) : undefined
  };

  const [total, leads] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip,
      take: limit
    })
  ]);

  return res.json({
    success: true,
    message: 'Leads fetched',
    data: leads,
    meta: buildMeta(page, limit, total)
  });
};

export const updateLeadStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body as { status: string; notes?: string };

  const updated = await prisma.lead.update({
    where: { id },
    data: {
      status: status as any,
      notes: notes ?? null
    }
  });

  return sendSuccess(res, updated, 'Lead updated');
};

export const exportLeadsCsv = async (_req: Request, res: Response) => {
  const leads = await prisma.lead.findMany({ orderBy: { created_at: 'desc' } });

  const records = leads.map((lead: (typeof leads)[number]) => ({
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    pincode: lead.pincode,
    address: lead.address,
    service_type: lead.service_type,
    status: lead.status,
    created_at: lead.created_at.toISOString()
  }));

  const csv = stringify(records, { header: true });
  res.header('Content-Type', 'text/csv');
  res.attachment('masterbrush-leads.csv');
  return res.send(csv);
};

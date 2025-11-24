import type { Lead, Painter as PainterModel } from '@prisma/client';
import type { Express, Request, Response } from 'express';

import { prisma } from '../lib/prisma';
import { sendSuccess } from '../utils/http';
import { sendPainterConfirmation, sendAdminNewPainterNotification } from '../services/email.service';

const normaliseFiles = (files?: Express.Multer.File[]) =>
  files?.map((file) => ({
    filename: file.filename ?? file.originalname,
    path: file.path,
    mimetype: file.mimetype,
    size: file.size
  })) ?? [];

export const createPainterApplication = async (req: Request, res: Response) => {
  const body = req.body as Record<string, unknown>;
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;

  // Handle skills - can be array or JSON string
  const skills = Array.isArray(body.skills)
    ? body.skills
    : (typeof body.skills === 'string' ? JSON.parse(body.skills) : []);

  // Handle preferred_zones - can be array, JSON string, or undefined
  const preferredZones = body.preferred_zones
    ? (Array.isArray(body.preferred_zones)
      ? body.preferred_zones
      : JSON.parse(String(body.preferred_zones)))
    : [];

  const painter = await prisma.painter.create({
    data: {
      full_name: String(body.full_name),
      phone: String(body.phone),
      email: String(body.email),
      city: String(body.city),
      years_experience: Number(body.years_experience),
      skills: JSON.stringify(skills),
      preferred_zones: JSON.stringify(preferredZones),
      expected_rate: body.expected_rate ? String(body.expected_rate) : null,
      portfolio_urls: null,
      doc_urls: null
    }
  });

  // Send confirmation email to painter (don't block on email failure)
  sendPainterConfirmation({
    full_name: painter.full_name,
    email: painter.email,
    city: painter.city,
    years_experience: painter.years_experience
  }).catch(err => console.error('Failed to send painter confirmation:', err));

  // Send notification to admin (don't block on email failure)
  sendAdminNewPainterNotification({
    full_name: painter.full_name,
    email: painter.email,
    phone: painter.phone,
    city: painter.city,
    years_experience: painter.years_experience,
    skills: skills
  }).catch(err => console.error('Failed to send admin notification:', err));

  return sendSuccess(res, painter, 'Application submitted', 201);
};

export const listPainters = async (req: Request, res: Response) => {
  const status = req.query.status ? String(req.query.status) : undefined;
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 20);
  const skip = (page - 1) * limit;

  const where: { status?: PainterStatus } = {};
  if (status) {
    where.status = status as PainterStatus;
  }

  const [total, paintersRaw] = await Promise.all([
    prisma.painter.count({ where }),
    prisma.painter.findMany({ where, skip, take: limit, orderBy: { created_at: 'desc' } })
  ]);

  // Ensure skills is always an array
  const painters = paintersRaw.map(painter => ({
    ...painter,
    skills: Array.isArray(painter.skills)
      ? painter.skills
      : (typeof painter.skills === 'string'
        ? JSON.parse(painter.skills)
        : [])
  }));

  return res.json({
    success: true,
    message: 'Painters fetched',
    data: painters,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1
    }
  });
};

export const approvePainter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, admin_notes } = req.body as { status: string; admin_notes?: string };

  const painter = await prisma.painter.update({
    where: { id },
    data: {
      status: status as any,
      admin_notes: admin_notes ?? null
    }
  });

  await sendNotification({
    toEmail: painter.email,
    subject: `Your Master Brush status: ${painter.status}`,
    html: painterApprovalTemplate(painter.full_name, painter.status, admin_notes ?? undefined),
    text: `Your Master Brush status is now ${painter.status}`,
    toPhone: painter.phone
  });

  return sendSuccess(res, painter, 'Painter updated');
};

type ChecklistStatus = 'pending' | 'completed';

type PainterJob = {
  id: string;
  clientName: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  surfaces: string[];
  colours: string[];
  progress: number;
  priority: 'high' | 'medium' | 'low';
  notes: string;
  crew: string[];
  nextVisit: string;
};

type PainterMaterialRequest = {
  id: string;
  item: string;
  quantity: string;
  neededBy: string;
  status: 'pending' | 'approved' | 'delivered';
};

type PainterScheduleSlot = {
  time: string;
  jobId: string;
  clientName: string;
  status: 'scheduled' | 'completed' | 'travel';
};

type PainterScheduleDay = {
  date: string;
  slots: PainterScheduleSlot[];
};

type PainterChecklistItem = {
  id: string;
  label: string;
  status: ChecklistStatus;
};

type PainterSafetyNote = {
  id: string;
  title: string;
  description: string;
};

type PainterDashboardPayload = {
  summary: {
    jobsToday: number;
    pendingTasks: number;
    hoursThisWeek: number;
    satisfactionScore: number;
  };
  activeJob: PainterJob;
  upcomingJobs: PainterJob[];
  schedule: PainterScheduleDay[];
  materialRequests: PainterMaterialRequest[];
  standardChecklist: PainterChecklistItem[];
  safetyNotes: PainterSafetyNote[];
};

const FALLBACK_DASHBOARD: PainterDashboardPayload = {
  summary: {
    jobsToday: 3,
    pendingTasks: 5,
    hoursThisWeek: 28,
    satisfactionScore: 4.8
  },
  activeJob: {
    id: 'job-1024',
    clientName: 'Rhea & Aman Khanna',
    location: 'DLF Phase 4, Gurugram',
    startDate: '2025-11-14T09:00:00.000Z',
    endDate: '2025-11-16T17:00:00.000Z',
    status: 'in-progress',
    surfaces: ['Living room walls', 'Dining ceiling', 'Feature wall'],
    colours: ['MB-208 Sunrise Beige', 'MB-045 Cloud White'],
    progress: 62,
    priority: 'high',
    notes: 'Day 2: Touch-up coat scheduled post lunch. Client prefers low-VOC finish near nursery.',
    crew: ['Amit (Lead)', 'Rohit', 'Rakesh'],
    nextVisit: '2025-11-15T09:00:00.000Z'
  },
  upcomingJobs: [
    {
      id: 'job-1025',
      clientName: 'Sonia Verma',
      location: 'Sector 50, Noida',
      startDate: '2025-11-17T09:00:00.000Z',
      endDate: '2025-11-18T18:00:00.000Z',
      status: 'scheduled',
      surfaces: ['Master bedroom walls', 'Wardrobe shutters'],
      colours: ['MB-312 Misty Mauve'],
      progress: 0,
      priority: 'medium',
      notes: 'Client requested painter mats for flooring. Deliver by day 1 breakfast slot.',
      crew: ['Amit (Lead)', 'Sameer'],
      nextVisit: '2025-11-17T09:00:00.000Z'
    },
    {
      id: 'job-1022',
      clientName: 'Taneja Residence',
      location: 'Rajouri Garden, Delhi',
      startDate: '2025-11-19T09:00:00.000Z',
      endDate: '2025-11-22T18:00:00.000Z',
      status: 'scheduled',
      surfaces: ['Façade repaint', 'Balcony railing'],
      colours: ['MB-006 Alpine White', 'MB-889 Brick Ember'],
      progress: 0,
      priority: 'medium',
      notes: 'Scaffolding to be inspected on arrival. Safety kit mandatory.',
      crew: ['Amit (Lead)', 'Rohit', 'Rajesh'],
      nextVisit: '2025-11-19T09:00:00.000Z'
    }
  ],
  schedule: [
    {
      date: '2025-11-14',
      slots: [
        { time: '08:00', jobId: 'travel', clientName: 'Transit to Khanna Residence', status: 'travel' },
        { time: '09:00', jobId: 'job-1024', clientName: 'Khanna Residence', status: 'scheduled' },
        { time: '13:00', jobId: 'job-1024', clientName: 'Khanna Residence', status: 'scheduled' },
        { time: '17:30', jobId: 'closeout', clientName: 'Site close & audit log', status: 'completed' }
      ]
    },
    {
      date: '2025-11-15',
      slots: [
        { time: '09:00', jobId: 'job-1024', clientName: 'Khanna Residence', status: 'scheduled' },
        { time: '14:30', jobId: 'inspection', clientName: 'QC Inspection + client walk-through', status: 'scheduled' }
      ]
    }
  ],
  materialRequests: [
    {
      id: 'req-301',
      item: 'MB-208 Sunrise Beige (20L can)',
      quantity: '2 units',
      neededBy: '2025-11-15',
      status: 'approved'
    },
    {
      id: 'req-302',
      item: 'Painter mats (Reusable) 12x12',
      quantity: '1 set',
      neededBy: '2025-11-16',
      status: 'pending'
    },
    {
      id: 'req-303',
      item: 'Respirator cartridges (N95)',
      quantity: '6 pieces',
      neededBy: '2025-11-18',
      status: 'delivered'
    }
  ],
  standardChecklist: [
    { id: 'check-1', label: 'Site protection and masking completed', status: 'completed' },
    { id: 'check-2', label: 'Surface moisture test logged in app', status: 'pending' },
    { id: 'check-3', label: 'Primer coat dry-time recorded', status: 'completed' },
    { id: 'check-4', label: 'VOC safety briefing with crew', status: 'pending' }
  ],
  safetyNotes: [
    {
      id: 'safe-1',
      title: 'Scaffold audit due today',
      description: 'Ensure scaffold lock pins are secured and photograph is uploaded to the audit log before 10 AM.'
    },
    {
      id: 'safe-2',
      title: 'Weather advisory',
      description: 'Light drizzle expected post 5 PM. Store all exterior paint cans indoors to avoid moisture ingress.'
    }
  ]
};

const toDate = (value?: Date | null) => (value ? new Date(value) : undefined);

const isSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

const isWithinDays = (base: Date, target: Date, days: number) => {
  const diff = target.getTime() - base.getTime();
  return diff >= 0 && diff <= days * 24 * 60 * 60 * 1000;
};

const formatTime = (date: Date) => `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

const addHours = (date: Date, hours: number) => {
  const copy = new Date(date);
  copy.setHours(copy.getHours() + hours);
  return copy;
};

const parseColourPreferences = (colorPref: Lead['color_pref']): string[] => {
  if (!colorPref) return [];

  if (Array.isArray(colorPref)) {
    return colorPref.map((value) => String(value)).filter(Boolean);
  }

  if (typeof colorPref === 'object') {
    return Object.values(colorPref)
      .map((value) => String(value))
      .filter(Boolean);
  }

  return [String(colorPref)];
};

const crewFromPainters = (painters: PainterModel[], take: number) =>
  (painters.length ? painters : [{ full_name: 'Master Brush Crew' } as PainterModel])
    .slice(0, take)
    .map((painter) => painter.full_name);

const progressFromStatus = (lead: Lead): number => {
  switch (lead.status) {
    case 'completed':
      return 100;
    case 'scheduled':
      return 10;
    case 'contacted':
      return 45;
    default:
      return 20;
  }
};

const jobPriority = (startDate: Date, reference: Date): PainterJob['priority'] => {
  if (isSameDay(startDate, reference)) return 'high';
  return isWithinDays(reference, startDate, 2) ? 'medium' : 'low';
};

const mapLeadToJob = (lead: Lead, crew: string[], reference: Date): PainterJob => {
  const startDate = toDate(lead.preferred_date) ?? reference;
  const endDate = addHours(startDate, 8);
  const colours = parseColourPreferences(lead.color_pref);
  const status: PainterJob['status'] = lead.status === 'completed' ? 'completed' : lead.status === 'scheduled' ? 'scheduled' : 'in-progress';

  return {
    id: lead.id,
    clientName: lead.name,
    location: lead.address,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    status,
    surfaces: lead.service_type ? lead.service_type.split(',').map((surface) => surface.trim()).filter(Boolean) : ['Interior repaint'],
    colours: colours.length ? colours : ['MB-208 Sunrise Beige'],
    progress: progressFromStatus(lead),
    priority: jobPriority(startDate, reference),
    notes: lead.notes ?? 'No job notes have been recorded yet. Update this from the lead detail view when available.',
    crew: crew.length ? crew : ['Master Brush Crew'],
    nextVisit: startDate.toISOString()
  };
};

const buildSchedule = (jobs: PainterJob[], reference: Date): PainterScheduleDay[] => {
  const scheduleMap = new Map<string, PainterScheduleSlot[]>();

  jobs.forEach((job) => {
    const start = new Date(job.startDate);
    const dayKey = start.toISOString().slice(0, 10);
    const slots = scheduleMap.get(dayKey) ?? [];

    slots.push({
      time: formatTime(start),
      jobId: job.id,
      clientName: job.clientName,
      status: job.status === 'completed' ? 'completed' : 'scheduled'
    });

    if (isSameDay(start, reference) && job.status !== 'completed') {
      const midpoint = new Date(start);
      midpoint.setHours(start.getHours() + 4);
      slots.push({
        time: formatTime(midpoint),
        jobId: `${job.id}-mid`,
        clientName: `${job.clientName} - midday check-in`,
        status: 'travel'
      });
    }

    scheduleMap.set(dayKey, slots);
  });

  return Array.from(scheduleMap.entries())
    .sort(([first], [second]) => (first > second ? 1 : -1))
    .slice(0, 2)
    .map(([date, slots]) => ({
      date,
      slots: slots.sort((a, b) => (a.time > b.time ? 1 : -1))
    }));
};

const buildMaterialRequests = (jobs: PainterJob[]): PainterMaterialRequest[] =>
  jobs.slice(0, 3).map((job, index) => ({
    id: `req-${job.id}-${index}`,
    item: `${job.colours[0] ?? 'Premium interior paint'} (20L can)`,
    quantity: '1 unit',
    neededBy: job.startDate.slice(0, 10),
    status: index === 0 ? 'approved' : index === 1 ? 'pending' : 'delivered'
  }));

const buildChecklist = (activeJob: PainterJob): PainterChecklistItem[] => {
  const checkpoints: PainterChecklistItem[] = [
    { id: 'check-1', label: 'Surface preparation & masking logged', status: 'pending' },
    { id: 'check-2', label: 'Colour confirmation signed-off', status: 'pending' },
    { id: 'check-3', label: 'Material inventory reconciled', status: 'pending' },
    { id: 'check-4', label: 'Daily site photos uploaded', status: 'pending' }
  ];

  return checkpoints.map((item, index) => ({
    ...item,
    status: activeJob.progress >= (index + 1) * 25 ? 'completed' : 'pending'
  }));
};

const buildSafetyNotes = (activeJob: PainterJob, upcomingJobs: PainterJob[]): PainterSafetyNote[] => {
  const notes: PainterSafetyNote[] = [
    {
      id: 'safe-1',
      title: 'Site readiness review',
      description: `Confirm masking, ventilation and PPE before work starts on ${new Date(activeJob.startDate).toDateString()}.`
    },
    {
      id: 'safe-2',
      title: 'Crew briefing reminder',
      description: 'Capture the safety briefing acknowledgement inside the mobile audit log during first shift.'
    }
  ];

  if (upcomingJobs.length) {
    notes.push({
      id: 'safe-3',
      title: 'Upcoming exterior scope',
      description: `Prep scaffolding and weather covers for ${upcomingJobs[0].clientName} (${new Date(upcomingJobs[0].startDate).toDateString()}).`
    });
  }

  return notes;
};

const buildDashboardPayload = (
  leads: Lead[],
  painters: PainterModel[],
  contactedCount: number,
  reference: Date
): PainterDashboardPayload => {
  const datedLeads = leads.filter((lead) => lead.preferred_date);

  if (!datedLeads.length) {
    return FALLBACK_DASHBOARD;
  }

  const sortedLeads = datedLeads.sort((a, b) => {
    const first = toDate(a.preferred_date) ?? reference;
    const second = toDate(b.preferred_date) ?? reference;
    return first.getTime() - second.getTime();
  });

  const crew = crewFromPainters(painters, 3);
  const jobs = sortedLeads.map((lead) => mapLeadToJob(lead, crew, reference));

  const activeJob = jobs.find((job) => isSameDay(new Date(job.startDate), reference)) ?? jobs[0];
  const upcomingJobs = jobs.filter((job) => job.id !== activeJob.id).slice(0, 3);

  const jobsToday = jobs.filter((job) => isSameDay(new Date(job.startDate), reference)).length;
  const jobsThisWeek = jobs.filter((job) => isWithinDays(reference, new Date(job.startDate), 6)).length;

  const pendingTasks = contactedCount + buildChecklist(activeJob).filter((item) => item.status === 'pending').length;

  const approvedPainters = painters.length;
  const satisfactionScore = Math.min(5, 4 + approvedPainters * 0.15);

  const schedule = buildSchedule([activeJob, ...upcomingJobs], reference);
  const materialRequests = buildMaterialRequests([activeJob, ...upcomingJobs]);
  const checklist = buildChecklist(activeJob);
  const safetyNotes = buildSafetyNotes(activeJob, upcomingJobs);

  return {
    summary: {
      jobsToday,
      pendingTasks,
      hoursThisWeek: jobsThisWeek * 6,
      satisfactionScore: Number(satisfactionScore.toFixed(1))
    },
    activeJob,
    upcomingJobs,
    schedule,
    materialRequests,
    standardChecklist: checklist,
    safetyNotes
  };
};

export const getPainterDashboard = async (_req: Request, res: Response) => {
  const reference = new Date();

  const [leadResults, approvedPainters, contactedCount] = await Promise.all([
    prisma.lead.findMany({
      where: { status: { in: ['contacted', 'scheduled', 'completed'] } },
      orderBy: { preferred_date: 'asc' },
      take: 10
    }),
    prisma.painter.findMany({
      where: { status: 'approved' },
      orderBy: { updated_at: 'desc' },
      take: 5
    }),
    prisma.lead.count({ where: { status: 'contacted' } })
  ]);

  const payload = buildDashboardPayload(leadResults, approvedPainters, contactedCount, reference);

  return sendSuccess(res, payload, payload === FALLBACK_DASHBOARD ? 'Painter dashboard fetched from fallback template' : 'Painter dashboard fetched');
};

"use client";

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';

import { api } from '../../lib/api';

type ChecklistStatus = 'pending' | 'completed';

type PainterChecklistItem = {
  id: string;
  label: string;
  status: ChecklistStatus;
};

type PainterMaterialRequest = {
  id: string;
  item: string;
  quantity: string;
  neededBy: string;
  status: 'pending' | 'approved' | 'delivered';
};

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

type PainterSafetyNote = {
  id: string;
  title: string;
  description: string;
};

type PainterDashboard = {
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

const fallbackDashboard: PainterDashboard = {
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
    startDate: '2025-11-14T09:00:00Z',
    endDate: '2025-11-16T17:00:00Z',
    status: 'in-progress',
    surfaces: ['Living room walls', 'Dining ceiling', 'Feature wall'],
    colours: ['MB-208 Sunrise Beige', 'MB-045 Cloud White'],
    progress: 62,
    priority: 'high',
    notes: 'Day 2: Touch-up coat scheduled post lunch. Client prefers low-VOC finish near nursery.',
    crew: ['Amit (Lead)', 'Rohit', 'Rakesh'],
    nextVisit: '2025-11-15T09:00:00Z'
  },
  upcomingJobs: [
    {
      id: 'job-1025',
      clientName: 'Sonia Verma',
      location: 'Sector 50, Noida',
      startDate: '2025-11-17T09:00:00Z',
      endDate: '2025-11-18T18:00:00Z',
      status: 'scheduled',
      surfaces: ['Master bedroom walls', 'Wardrobe shutters'],
      colours: ['MB-312 Misty Mauve'],
      progress: 0,
      priority: 'medium',
      notes: 'Client requested painter mats for flooring. Deliver by day 1 breakfast slot.',
      crew: ['Amit (Lead)', 'Sameer'],
      nextVisit: '2025-11-17T09:00:00Z'
    },
    {
      id: 'job-1022',
      clientName: 'Taneja Residence',
      location: 'Rajouri Garden, Delhi',
      startDate: '2025-11-19T09:00:00Z',
      endDate: '2025-11-22T18:00:00Z',
      status: 'scheduled',
      surfaces: ['Façade repaint', 'Balcony railing'],
      colours: ['MB-006 Alpine White', 'MB-889 Brick Ember'],
      progress: 0,
      priority: 'medium',
      notes: 'Scaffolding to be inspected on arrival. Safety kit mandatory.',
      crew: ['Amit (Lead)', 'Rohit', 'Rajesh'],
      nextVisit: '2025-11-19T09:00:00Z'
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

const materialStatusClasses: Record<PainterMaterialRequest['status'], string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-sky-100 text-sky-700',
  delivered: 'bg-emerald-100 text-emerald-700'
};

const jobPriorityClasses: Record<PainterJob['priority'], string> = {
  high: 'bg-red-50 text-red-600',
  medium: 'bg-amber-50 text-amber-600',
  low: 'bg-emerald-50 text-emerald-600'
};

export function PainterWorkspace() {
  const { data, error } = useQuery({
    queryKey: ['painter-dashboard'],
    queryFn: async () => {
      const response = await api.get<PainterDashboard>('/painters/dashboard');
      return response.data;
    },
    staleTime: 60_000,
    retry: 1,
    initialData: fallbackDashboard
  });

  useEffect(() => {
    if (error) {
      toast.error('Unable to reach painter dashboard API. Showing latest synced data.');
    }
  }, [error]);

  const dashboard = data ?? fallbackDashboard;

  const [checklistItems, setChecklistItems] = useState<PainterChecklistItem[]>(dashboard.standardChecklist);

  useEffect(() => {
    setChecklistItems(dashboard.standardChecklist);
  }, [dashboard.standardChecklist]);

  const toggleChecklist = (event: ChangeEvent<HTMLInputElement>, itemId: string) => {
    const checked = event.target.checked;
    setChecklistItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, status: checked ? 'completed' : 'pending' } : item
      )
    );
  };

  const progressBarWidth = `${dashboard.activeJob.progress}%`;

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Jobs today" value={dashboard.summary.jobsToday.toString()} description="Assigned to your crew" />
        <StatCard label="Tasks pending" value={dashboard.summary.pendingTasks.toString()} description="From current job" />
        <StatCard label="Hours logged" value={`${dashboard.summary.hoursThisWeek}h`} description="This week" />
        <StatCard label="Client rating" value={dashboard.summary.satisfactionScore.toFixed(1)} description="Rolling 30 days" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">Active job</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{dashboard.activeJob.clientName}</h2>
                <p className="text-sm text-slate-500">{dashboard.activeJob.location}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${jobPriorityClasses[dashboard.activeJob.priority]}`}>
                {dashboard.activeJob.priority.toUpperCase()} PRIORITY
              </span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase text-slate-500">Timeline</p>
                <p className="text-sm text-slate-600">
                  {formatDate(dashboard.activeJob.startDate)} → {formatDate(dashboard.activeJob.endDate)}
                </p>
                <p className="text-xs text-slate-500">Next visit {formatDate(dashboard.activeJob.nextVisit, true)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase text-slate-500">Crew</p>
                <p className="text-sm text-slate-600">{dashboard.activeJob.crew.join(', ')}</p>
                <p className="text-xs text-slate-500">Surfaces: {dashboard.activeJob.surfaces.join(', ')}</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Progress</span>
                <span>{dashboard.activeJob.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-brand-primary transition-all" style={{ width: progressBarWidth }} aria-hidden="true" />
              </div>
              <div className="flex flex-wrap gap-2">
                {dashboard.activeJob.colours.map((colour) => (
                  <span key={colour} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                    {colour}
                  </span>
                ))}
              </div>
              <p className="text-sm text-slate-600">{dashboard.activeJob.notes}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Upcoming jobs</h3>
              <p className="text-xs text-slate-500">Auto-synced from Master Brush planner</p>
            </div>
            <div className="mt-4 space-y-4">
              {dashboard.upcomingJobs.map((job) => (
                <article key={job.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{job.clientName}</p>
                      <p className="text-xs text-slate-500">{job.location}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {formatDate(job.startDate)}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                    {job.surfaces.map((surface) => (
                      <span key={surface} className="rounded-full bg-slate-100 px-2 py-1">
                        {surface}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{job.notes}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Crew checklist</h3>
            <p className="text-xs text-slate-500">Syncs with on-site audit log</p>
            <ul className="mt-4 space-y-3">
              {checklistItems.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <input
                    id={item.id}
                    type="checkbox"
                    checked={item.status === 'completed'}
                    onChange={(event) => toggleChecklist(event, item.id)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                  />
                  <label htmlFor={item.id} className="text-sm text-slate-600">
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Material requests</h3>
            <div className="mt-4 space-y-4">
              {dashboard.materialRequests.map((request) => (
                <div key={request.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{request.item}</p>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${materialStatusClasses[request.status]}`}>
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Quantity: {request.quantity}</p>
                  <p className="text-xs text-slate-500">Needed by {formatDate(request.neededBy)}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Two-day schedule</h3>
          <div className="mt-4 space-y-6">
            {dashboard.schedule.map((day) => (
              <div key={day.date}>
                <p className="text-xs font-semibold uppercase text-slate-500">{formatDate(day.date)}</p>
                <div className="mt-3 space-y-3">
                  {day.slots.map((slot) => (
                    <div key={`${day.date}-${slot.time}`} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-3">
                      <span className="mt-0.5 text-xs font-semibold text-slate-500 w-16">{slot.time}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">{slot.clientName}</p>
                        <p className="text-xs text-slate-500">{renderScheduleStatus(slot.status)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Safety & quality notes</h3>
          <ul className="mt-4 space-y-4">
            {dashboard.safetyNotes.map((note) => (
              <li key={note.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">{note.title}</p>
                <p className="mt-2 text-sm text-slate-600">{note.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function formatDate(value: string, includeTime = false) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  const options: Intl.DateTimeFormatOptions = includeTime
    ? { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }
    : { weekday: 'short', day: 'numeric', month: 'short' };
  return date.toLocaleString('en-IN', options);
}

function renderScheduleStatus(status: PainterScheduleSlot['status']) {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'travel':
      return 'Travel';
    default:
      return 'Scheduled';
  }
}

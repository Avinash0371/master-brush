"use client";

import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { api } from '../../lib/api';

export type LeadStatusKey = 'new' | 'contacted' | 'scheduled' | 'completed';
export type PainterStatusKey = 'pending' | 'approved' | 'rejected';
export type AlertSeverity = 'info' | 'warning' | 'critical';

export type AdminLead = {
  id: string;
  name: string;
  status: LeadStatusKey;
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

export type AdminPainter = {
  id: string;
  fullName: string;
  city: string;
  email: string;
  phone: string;
  status: PainterStatusKey;
  yearsExperience: number;
  expectedRate: string | null;
  skills: string[];
  submittedAt: string;
  adminNotes: string | null;
};

export type AdminDashboardData = {
  summary: {
    totalLeads: number;
    leadsToday: number;
    scheduledVisits: number;
    conversionRate: number;
    avgResponseHours: number;
  };
  leadStatus: Array<{
    status: LeadStatusKey;
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
    severity: AlertSeverity;
  }>;
  recentLeads: AdminLead[];
  painterApplications: AdminPainter[];
};

type LeadMutationPayload = { id: string; status: LeadStatusKey; notes?: string };
type PainterMutationPayload = { id: string; status: PainterStatusKey; notes?: string };

const severityClasses: Record<AlertSeverity, string> = {
  info: 'bg-sky-100 text-sky-700',
  warning: 'bg-amber-100 text-amber-700',
  critical: 'bg-rose-100 text-rose-700'
};

const leadStatusOptions: Array<{ value: LeadStatusKey; label: string }> = [
  { value: 'new', label: 'New enquiry' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'scheduled', label: 'Scheduled visit' },
  { value: 'completed', label: 'Completed' }
];

const painterStatusOptions: Array<{ value: PainterStatusKey; label: string }> = [
  { value: 'pending', label: 'Pending review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' }
];

export function AdminDashboard() {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    isFetching,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const response = await api.get<{ success: boolean; message: string; data: AdminDashboardData }>('/admin/dashboard');
      return response.data.data;
    },
    staleTime: 120_000,
    retry: 1
  });

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message ?? 'Unable to reach admin dashboard API.');
    }
  }, [error]);

  const leadMutation = useMutation<AdminLead, Error, LeadMutationPayload>({
    mutationFn: async ({ id, status, notes }) => {
      const response = await api.patch<{ success: boolean; message: string; data: AdminLead }>(`/admin/leads/${id}/status`, {
        status,
        notes
      });
      return response.data.data;
    },
    onSuccess: (updatedLead) => {
      toast.success('Lead updated successfully');
      queryClient.setQueryData<AdminDashboardData | undefined>(['admin-dashboard'], (existing) => {
        if (!existing) return existing;
        return {
          ...existing,
          recentLeads: existing.recentLeads.map((lead) => (lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead))
        };
      });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'], exact: true });
    },
    onError: (mutationError) => {
      toast.error(mutationError.message);
    }
  });

  const painterMutation = useMutation<AdminPainter, Error, PainterMutationPayload>({
    mutationFn: async ({ id, status, notes }) => {
      const response = await api.patch<{ success: boolean; message: string; data: AdminPainter }>(`/admin/painters/${id}/status`, {
        status,
        notes
      });
      return response.data.data;
    },
    onSuccess: (updatedPainter) => {
      toast.success('Painter application updated');
      queryClient.setQueryData<AdminDashboardData | undefined>(['admin-dashboard'], (existing) => {
        if (!existing) return existing;
        return {
          ...existing,
          painterApplications: existing.painterApplications.map((painter) =>
            painter.id === updatedPainter.id ? { ...painter, ...updatedPainter } : painter
          )
        };
      });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'], exact: true });
    },
    onError: (mutationError) => {
      toast.error(mutationError.message);
    }
  });

  const handleLeadUpdate = useCallback(
    ({ id, status, notes }: LeadMutationPayload) => {
      const trimmedNotes = notes?.trim();
      leadMutation.mutate({ id, status, notes: trimmedNotes ? trimmedNotes : undefined });
    },
    [leadMutation]
  );

  const handlePainterUpdate = useCallback(
    ({ id, status, notes }: PainterMutationPayload) => {
      const trimmedNotes = notes?.trim();
      painterMutation.mutate({ id, status, notes: trimmedNotes ? trimmedNotes : undefined });
    },
    [painterMutation]
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (!data) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  const dashboard = data;

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-5">
        <StatCard label="Total leads" value={dashboard.summary.totalLeads.toString()} description="Across all statuses" isLoading={isFetching} />
        <StatCard label="Leads today" value={dashboard.summary.leadsToday.toString()} description="New submissions" isLoading={isFetching} />
        <StatCard label="Scheduled visits" value={dashboard.summary.scheduledVisits.toString()} description="Site visits locked" isLoading={isFetching} />
        <StatCard label="Conversion rate" value={`${dashboard.summary.conversionRate.toFixed(1)}%`} description="Completed vs total" isLoading={isFetching} />
        <StatCard label="Avg response" value={`${dashboard.summary.avgResponseHours.toFixed(1)}h`} description="Lead to first action" isLoading={isFetching} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <header className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">Lead pipeline</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Status distribution</h2>
              </div>
            </header>
            <div className="mt-6 space-y-4">
              {dashboard.leadStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{formatLeadStatus(item.status)}</p>
                    <p className="text-xs text-slate-500">Week-on-week change</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-slate-900">{item.count}</p>
                    <TrendPill value={item.weekChange} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <header className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">Upcoming site visits</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Next five appointments</h2>
              </div>
            </header>
            <div className="mt-6 space-y-4">
              {dashboard.upcomingAppointments.length ? (
                dashboard.upcomingAppointments.map((visit) => (
                  <article key={visit.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{visit.clientName}</p>
                        <p className="text-xs text-slate-500">{visit.address}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {formatDateTime(visit.scheduledFor)}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                      <span>Status: {formatLeadStatus(visit.status as LeadStatusKey)}</span>
                      <span>Assigned: {visit.painterAssigned ?? 'Unassigned'}</span>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
                  No scheduled visits in the next few days.
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <header>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">Painter availability</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Application funnel</h2>
            </header>
            <dl className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <dt className="font-medium text-slate-700">Approved painters</dt>
                <dd className="font-semibold text-slate-900">{dashboard.painterSummary.approved}</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <dt className="font-medium text-slate-700">Pending review</dt>
                <dd className="font-semibold text-slate-900">{dashboard.painterSummary.pending}</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <dt className="font-medium text-slate-700">Rejected</dt>
                <dd className="font-semibold text-slate-900">{dashboard.painterSummary.rejected}</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-dashed border-brand-secondary/40 px-4 py-3">
                <dt className="font-medium text-slate-700">New this week</dt>
                <dd className="font-semibold text-brand-secondary">+{dashboard.painterSummary.newThisWeek}</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl px-4 py-3 text-xs text-slate-500">
                <dt>Total painters</dt>
                <dd>{dashboard.painterSummary.total}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <header>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">Operations alerts</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Action items</h2>
            </header>
            <ul className="mt-6 space-y-3">
              {dashboard.alerts.map((alert) => (
                <li key={alert.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${severityClasses[alert.severity]}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <p className="mt-3 font-medium text-slate-900">{alert.message}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">Recent leads</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Latest enquiries</h2>
          </div>
        </header>
        <div className="mt-6 space-y-4">
          {dashboard.recentLeads.length ? (
            dashboard.recentLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onUpdate={handleLeadUpdate}
                isUpdating={leadMutation.isPending && leadMutation.variables?.id === lead.id}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
              No leads captured yet.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">Painter applications</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Review queue</h2>
          </div>
        </header>
        <div className="mt-6 space-y-4">
          {dashboard.painterApplications.length ? (
            dashboard.painterApplications.map((painter) => (
              <PainterCard
                key={painter.id}
                painter={painter}
                onUpdate={handlePainterUpdate}
                isUpdating={painterMutation.isPending && painterMutation.variables?.id === painter.id}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
              No painter applications in the queue right now.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">Team activity</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Latest updates</h2>
          </div>
        </header>
        <ul className="mt-6 space-y-4">
          {dashboard.teamActivity.length ? (
            dashboard.teamActivity.map((item) => (
              <li key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.category}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {formatDateTime(item.timestamp)}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{item.description}</p>
              </li>
            ))
          ) : (
            <li className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
              No team actions recorded yet.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}

function StatCard({ label, value, description, isLoading }: { label: string; value: string; description: string; isLoading: boolean }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-slate-900">{isLoading ? '—' : value}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function TrendPill({ value }: { value: number }) {
  if (value === 0) {
    return <span className="inline-flex rounded-full bg-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-600">No change</span>;
  }

  const sign = value > 0 ? '+' : '';
  const tone = value > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700';

  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${tone}`}>
      {sign}
      {value} this week
    </span>
  );
}

function LeadCard({ lead, onUpdate, isUpdating }: { lead: AdminLead; onUpdate: (payload: LeadMutationPayload) => void; isUpdating: boolean }) {
  const [status, setStatus] = useState<LeadStatusKey>(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? '');

  useEffect(() => {
    setStatus(lead.status);
  }, [lead.status]);

  useEffect(() => {
    setNotes(lead.notes ?? '');
  }, [lead.notes]);

  return (
    <article className="space-y-4 rounded-2xl border border-slate-200 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">{lead.name}</p>
          <p className="text-xs text-slate-500">{lead.email} • {lead.phone}</p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p>Submitted {formatDateTime(lead.createdAt)}</p>
          {lead.preferredDate ? <p>Preferred {formatDateTime(lead.preferredDate)}</p> : null}
        </div>
      </div>

      <div className="grid gap-3 text-sm text-slate-600 md:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Service</p>
          <p className="font-medium text-slate-900">{lead.serviceType}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Address</p>
          <p className="font-medium text-slate-900">{lead.address}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Pincode</p>
          <p className="font-medium text-slate-900">{lead.pincode}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[200px_1fr]">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Status</label>
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-brand-secondary focus:outline-none"
            value={status}
            onChange={(event) => setStatus(event.target.value as LeadStatusKey)}
            disabled={isUpdating}
          >
            {leadStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Internal notes</label>
          <textarea
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-brand-secondary focus:outline-none"
            rows={2}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Add a quick follow-up note"
            disabled={isUpdating}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => {
            setStatus(lead.status);
            setNotes(lead.notes ?? '');
          }}
          disabled={isUpdating}
        >
          Reset
        </button>
        <button
          type="button"
          className="rounded-xl bg-brand-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-secondary/90 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={() => onUpdate({ id: lead.id, status, notes })}
          disabled={isUpdating}
        >
          {isUpdating ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </article>
  );
}

function PainterCard({
  painter,
  onUpdate,
  isUpdating
}: {
  painter: AdminPainter;
  onUpdate: (payload: PainterMutationPayload) => void;
  isUpdating: boolean;
}) {
  const [status, setStatus] = useState<PainterStatusKey>(painter.status);
  const [notes, setNotes] = useState(painter.adminNotes ?? '');

  useEffect(() => {
    setStatus(painter.status);
  }, [painter.status]);

  useEffect(() => {
    setNotes(painter.adminNotes ?? '');
  }, [painter.adminNotes]);

  return (
    <article className="space-y-4 rounded-2xl border border-slate-200 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">{painter.fullName}</p>
          <p className="text-xs text-slate-500">
            {painter.email} • {painter.phone}
          </p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p>Submitted {formatDateTime(painter.submittedAt)}</p>
          <p>Status: {formatPainterStatus(painter.status)}</p>
        </div>
      </div>

      <div className="grid gap-3 text-sm text-slate-600 md:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">City</p>
          <p className="font-medium text-slate-900">{painter.city}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Experience</p>
          <p className="font-medium text-slate-900">{painter.yearsExperience} yrs</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Expected rate</p>
          <p className="font-medium text-slate-900">{painter.expectedRate ?? '—'}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Skills</p>
          <p className="font-medium text-slate-900">{painter.skills.length ? painter.skills.join(', ') : 'Not specified'}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[200px_1fr]">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Status</label>
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-brand-secondary focus:outline-none"
            value={status}
            onChange={(event) => setStatus(event.target.value as PainterStatusKey)}
            disabled={isUpdating}
          >
            {painterStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Admin notes</label>
          <textarea
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-brand-secondary focus:outline-none"
            rows={2}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Share feedback or onboarding steps"
            disabled={isUpdating}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => {
            setStatus(painter.status);
            setNotes(painter.adminNotes ?? '');
          }}
          disabled={isUpdating}
        >
          Reset
        </button>
        <button
          type="button"
          className="rounded-xl bg-brand-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-secondary/90 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={() => onUpdate({ id: painter.id, status, notes })}
          disabled={isUpdating}
        >
          {isUpdating ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </article>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-36 animate-pulse rounded-3xl border border-slate-200 bg-slate-100" />
        ))}
      </div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-sm text-rose-700">
      <p className="font-semibold">Unable to load admin dashboard data.</p>
      <button
        type="button"
        className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-500"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
}

function formatLeadStatus(status: LeadStatusKey | string) {
  switch (status) {
    case 'new':
      return 'New enquiries';
    case 'contacted':
      return 'Contacted';
    case 'scheduled':
      return 'Scheduled';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
}

function formatPainterStatus(status: PainterStatusKey) {
  switch (status) {
    case 'pending':
      return 'Pending review';
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    default:
      return status;
  }
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

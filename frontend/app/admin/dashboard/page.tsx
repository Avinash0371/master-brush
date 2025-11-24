import { Suspense } from 'react';

import { PageHeader } from '../../../components/page-header';
import { AdminDashboard } from '../../../components/admin/admin-dashboard';

export const metadata = {
  title: 'Admin Dashboard | Master Brush',
  description: 'Monitor painter operations, lead pipeline, and scheduled site visits for Master Brush.'
};

export default function AdminDashboardPage() {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <PageHeader
          eyebrow="Operations"
          title="Admin Control Centre"
          description="Review the latest pipeline metrics, site visits, and approvals to keep Master Brush operations humming."
        />
        <div className="mt-10">
          <Suspense fallback={<Placeholder />}>
            <AdminDashboard />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

function Placeholder() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="h-40 animate-pulse rounded-3xl border border-slate-200 bg-slate-100" />
      ))}
    </div>
  );
}

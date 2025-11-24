import { Suspense } from 'react';

import { PageHeader } from '../../components/page-header';
import { PainterWorkspace } from '../../components/painters/painter-workspace';

export const metadata = {
  title: 'Painter Workflow | Master Brush',
  description: 'Live job tracker, crew checklists, and material requests for Master Brush painter teams.'
};

export default function PainterWorkflowPage() {
  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        eyebrow="Master Brush Crew Portal"
        title="Painter workflow overview"
        description="Track active jobs, complete quality audits, and sync material requests before every visit."
      />
      <Suspense fallback={<div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500">Loading painter workspace…</div>}>
        <PainterWorkspace />
      </Suspense>
    </div>
  );
}

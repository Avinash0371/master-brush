import type { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <header className="space-y-4">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">{eyebrow}</p> : null}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl font-semibold text-slate-900 md:text-5xl">{title}</h1>
          {description ? <p className="text-base text-slate-600 md:text-lg">{description}</p> : null}
        </div>
        {action ? <div className="lg:text-right">{action}</div> : null}
      </div>
    </header>
  );
}

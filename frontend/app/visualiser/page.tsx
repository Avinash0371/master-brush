import { Suspense } from 'react';
import type { Metadata } from 'next';

import { VisualiserApp } from '../../components/visualiser/visualiser-app';

export const metadata: Metadata = {
  title: 'Color Visualizer - Master Brush',
  description: 'Try different paint colors on your room virtually. Upload your space and visualize colors in real-time before painting.',
};

export default function VisualiserPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1800px]">
      {/* Page Header */}
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-brand-primary uppercase tracking-wide mb-2">
          Master Brush Virtual Studio
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Visualize Colors in Minutes
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Upload your space, try curated palettes, and create project-ready concepts. See how different colors look in your room before you paint!
        </p>
      </div>

      {/* Features Banner */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Upload Your Room</h3>
              <p className="text-sm text-slate-600">Or use sample templates</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Paint Virtually</h3>
              <p className="text-sm text-slate-600">Try different colors instantly</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Save & Share</h3>
              <p className="text-sm text-slate-600">Download or share with link</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizer App */}
      <Suspense fallback={
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-12 text-center shadow-lg">
          <div className="flex flex-col items-center gap-4">
            <svg className="h-12 w-12 animate-spin text-brand-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-lg font-semibold text-slate-600">Loading your visualizer...</p>
            <p className="text-sm text-slate-500">Preparing canvas and tools</p>
          </div>
        </div>
      }>
        <VisualiserApp />
      </Suspense>
    </div>
  );
}

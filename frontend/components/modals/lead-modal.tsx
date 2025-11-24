"use client";

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { LeadCaptureForm } from '../forms/lead-capture-form';
import { useModalStore } from '../../stores/modal-store';

export function LeadModal() {
  const { leadOpen, closeLead } = useModalStore();

  return (
    <Transition show={leadOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeLead}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-12">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="translate-y-6 opacity-0 scale-95"
              enterTo="translate-y-0 opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="translate-y-0 opacity-100 scale-100"
              leaveTo="translate-y-6 opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
                {/* Decorative Header Background */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-brand-primary/10 via-brand-secondary/10 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={closeLead}
                  className="absolute top-6 right-6 z-10 rounded-full p-2 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="relative p-8">
                  {/* Header Section */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-dark p-3 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <Dialog.Title className="text-2xl font-bold text-slate-900 mb-1">
                        Get a Free Painting Quote
                      </Dialog.Title>
                      <Dialog.Description className="text-sm text-slate-600 leading-relaxed">
                        Share a few details and our concierge will plan the perfect finish for your space.
                      </Dialog.Description>
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="mt-6">
                    <LeadCaptureForm layout="stacked" />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

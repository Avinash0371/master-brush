"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalStore } from '../../stores/modal-store';
import type { Colour } from '../../lib/types';

export function ColorCard({ colour }: { colour: Colour }) {
  const { openVisualiser } = useModalStore.getState();
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(colour.hex);
    setCopied(true);
    toast.success(`Copied ${colour.name} (${colour.hex})`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-primary/20"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      {/* Room Preview Overlay */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm p-6 flex items-center justify-center"
          >
            <div className="text-center space-y-4">
              {/* Mini room preview */}
              <div className="relative w-full h-32 rounded-xl overflow-hidden shadow-lg" style={{ backgroundColor: colour.hex }}>
                {/* Simple room illustration */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-20 bg-white/20 rounded-t-lg border-2 border-white/30" />
              </div>
              <p className="text-sm font-semibold text-slate-700">
                Preview on wall
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-48 w-full overflow-hidden" style={{ backgroundColor: colour.hex }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900 shadow-sm backdrop-blur-sm">
          {colour.family}
        </span>
        {colour.isTrending && (
          <span className="absolute top-4 left-4 rounded-full bg-brand-secondary px-3 py-1 text-xs font-bold text-brand-dark shadow-sm">
            Trending
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-brand-primary transition-colors">{colour.name}</h3>
          <p className="mt-2 text-sm text-slate-500 line-clamp-2">{colour.description}</p>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400 uppercase tracking-wider">
            <span>{colour.hex}</span>
            <span>{colour.finish}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              type="button"
              onClick={openVisualiser}
              className="flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-primary relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Ripple effect */}
              <motion.span
                className="absolute inset-0 bg-white"
                initial={{ scale: 0, opacity: 0.5 }}
                whileHover={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
              <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="relative z-10">Visualise</span>
            </motion.button>
            <motion.button
              type="button"
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all relative overflow-hidden ${copied
                ? 'border-green-500 bg-green-50 text-green-600'
                : 'border-slate-200 bg-white text-slate-600 hover:border-brand-primary hover:text-brand-primary'
                }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {copied && (
                <motion.span
                  className="absolute inset-0 bg-green-100"
                  initial={{ scale: 0 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              {copied ? (
                <>
                  <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="relative z-10">Copied</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="relative z-10">Copy Hex</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </article>
  );
}

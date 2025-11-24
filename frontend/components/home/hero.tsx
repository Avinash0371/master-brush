"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { LeadCaptureForm } from '../forms/lead-capture-form';
import { useModalStore, type ModalState } from '../../stores/modal-store';

// Custom Painting Tool Icons
const PaintBrushIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.71 4.63l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z" />
    <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z" />
  </svg>
);

const PaintRollerIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 6H6V4h12v4z" />
    <path d="M11 11h2v10h-2z" />
    <circle cx="12" cy="22" r="1" />
  </svg>
);

const ColorPaletteIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.21-.64-1.67-.08-.09-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

const PaintBucketIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3z" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

export function HeroSection() {
  const openLead = useModalStore((state: ModalState) => state.openLead);

  return (
    <section className="relative overflow-hidden min-h-[95vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero_background.png"
          alt="Master Brush crew finishing a modern living room"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/75 to-transparent" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
      </div>

      {/* Floating paint drops/splashes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 h-64 w-64 rounded-full bg-brand-secondary/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-1/3 h-96 w-96 rounded-full bg-brand-primary/10 blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Paint brush strokes decoration */}
        <div className="absolute top-40 right-20 opacity-10">
          <svg width="200" height="200" viewBox="0 0 200 200" className="text-brand-secondary">
            <path d="M10,100 Q50,50 100,100 T190,100" stroke="currentColor" strokeWidth="20" fill="none" strokeLinecap="round" opacity="0.3" />
            <path d="M20,120 Q60,70 110,120 T200,120" stroke="currentColor" strokeWidth="15" fill="none" strokeLinecap="round" opacity="0.2" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-28 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-10 text-white"
        >
          <div className="max-w-2xl space-y-8">
            {/* Badge with paint brush icon */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-secondary/20 to-yellow-400/20 px-5 py-2 text-sm font-bold uppercase tracking-wider text-brand-secondary border border-brand-secondary/30 backdrop-blur-sm shadow-lg"
            >
              <SparkleIcon />
              Rated 4.9/5 by 1,200+ Customers
            </motion.span>

            {/* Main Heading */}
            <h1 className="text-6xl font-serif font-bold sm:text-7xl leading-[1.1]">
              Transform Your Space
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-brand-secondary to-yellow-300 bg-clip-text text-transparent animate-gradient bg-size-200">
                with Master Brush
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-slate-100 leading-relaxed max-w-xl font-medium">
              Premium painting services with certified professionals and smart colour visualization tools. Experience perfection in every stroke.
            </p>

            {/* CTA Buttons with paint-themed icons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={openLead}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-secondary to-yellow-400 px-8 py-4 text-lg font-bold text-brand-dark shadow-2xl shadow-brand-secondary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-secondary/70 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <PaintBrushIcon />
                  Get Free Quote
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <Link
                href="/colour-catalogue"
                className="group rounded-xl border-2 border-white/40 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/20 hover:scale-105 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <ColorPaletteIcon />
                  Explore Colours
                </span>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <p className="text-3xl font-bold text-brand-secondary">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-slate-300 font-medium mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Feature Cards with painting tool icons */}
          <div className="grid gap-4 sm:grid-cols-3">
            {heroHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-secondary to-yellow-400 shadow-lg text-brand-dark">
                    {highlight.icon}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
                    {highlight.badge}
                  </p>
                </div>
                <p className="text-lg font-serif font-semibold text-white mb-1">{highlight.title}</p>
                <p className="text-sm text-slate-300 leading-snug">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="relative hidden lg:block"
        >
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-secondary/20 blur-[100px]" aria-hidden="true" />
          <div className="relative rounded-3xl border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-brand-primary/40 blur-[80px]" aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-secondary to-yellow-400 shadow-lg text-brand-dark">
                  <PaintRollerIcon />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-white">Plan Your Project</h2>
                  <p className="text-sm text-brand-secondary font-semibold">30-min response time</p>
                </div>
              </div>
              <p className="text-sm text-slate-200 mb-6">Fill the form and our colour concierge will call you within 30 minutes.</p>
              <div className="bg-white/5 rounded-2xl p-1 shadow-inner border border-white/10 backdrop-blur-sm">
                <LeadCaptureForm layout="vertical" />
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white/30 bg-gradient-to-br from-slate-300 to-slate-400 shadow-lg" />
                  ))}
                </div>
                <p className="text-xs text-slate-200 font-semibold">
                  <span className="text-brand-secondary">1,200+</span> happy customers across India
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const stats = [
  { value: 1200, suffix: '+', label: 'Happy Customers' },
  { value: 500, suffix: '+', label: 'Projects Done' },
  { value: 5, suffix: ' Star', label: 'Average Rating' }
];

const heroHighlights = [
  {
    badge: 'Certified',
    title: 'Expert Crew',
    description: 'Vetted painters trained on surface prep, finish quality, and site hygiene.',
    icon: <PaintBrushIcon />
  },
  {
    badge: 'Tech-First',
    title: 'Live Tracking',
    description: 'Real-time updates, digital checklists, and transparent progress photos.',
    icon: <PaintBucketIcon />
  },
  {
    badge: 'Clean',
    title: 'Zero Mess',
    description: 'Dust-free sanding, vacuum filtration, and dedicated protection kits.',
    icon: <SparkleIcon />
  }
];

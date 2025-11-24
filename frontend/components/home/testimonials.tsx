"use client";

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      'Master Brush transformed our rental in four days, complete with dust containment and daily progress reports. The finish is hotel-grade.',
    name: 'Nandita & Arjun',
    location: 'Bengaluru • 3BHK',
    image: 'https://images.masterbrush.ai/testimonials/couple-modern.webp'
  },
  {
    quote:
      'We used their colour visualiser to shortlist palettes, and the on-site supervisor ensured every trim line was razor sharp.',
    name: 'Shalini Kapoor',
    location: 'Delhi NCR • Villa',
    image: 'https://images.masterbrush.ai/testimonials/shalini-kapoor.webp'
  },
  {
    quote:
      'The painter onboarding is seamless. As a contractor, I get steady projects, on-time payouts, and premium tools.',
    name: 'Ravi Singh',
    location: 'Certified Master Brush Pro',
    image: 'https://images.masterbrush.ai/testimonials/ravi-singh.webp'
  }
];

export function Testimonials() {
  return (
    <section id="inspiration" className="bg-brand-dark py-24 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-secondary/10 blur-[100px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-16"
        >
          <div className="max-w-2xl">
            <span className="text-brand-secondary font-bold uppercase tracking-wider text-sm">Testimonials</span>
            <h2 className="text-4xl font-serif font-bold mt-3">Stories finished with perfection</h2>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Discover how homeowners and painters trust Master Brush for outcome-driven painting.
            </p>
          </div>
          <a href="/visualiser" className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-white transition-colors">
            Try the Visualiser
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col gap-6 rounded-2xl bg-white/5 border border-white/10 p-8 shadow-xl backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <blockquote className="text-lg leading-relaxed text-slate-200 italic font-serif">“{item.quote}”</blockquote>
              <div className="mt-auto flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="h-12 w-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-secondary font-bold text-lg">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <figcaption className="text-base font-semibold text-white">{item.name}</figcaption>
                  <p className="text-xs font-medium text-brand-secondary uppercase tracking-wide">{item.location}</p>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

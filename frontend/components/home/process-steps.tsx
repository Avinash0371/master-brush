"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const steps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We visit, assess, and provide a laser-accurate quote.',
    image: '/images/process_walkthrough.png'
  },
  {
    number: '02',
    title: 'Planning',
    description: 'Colour experts help you choose the perfect palette.',
    image: '/images/process_plan.png'
  },
  {
    number: '03',
    title: 'Execution',
    description: 'Our crew masks, preps, and paints with zero mess.',
    image: '/images/process_painters.png'
  },
  {
    number: '04',
    title: 'Handover',
    description: 'A final walkthrough to ensure 100% satisfaction.',
    image: '/images/process_handover.png'
  }
];

export function ProcessSteps() {
  return (
    <section id="process" className="py-24 bg-brand-light">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-brand-secondary font-bold uppercase tracking-wider text-sm">How It Works</span>
          <h2 className="text-4xl font-serif font-bold text-brand-dark mt-3">Painting Simplified</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            A transparent, hassle-free process designed around your convenience.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-md mb-6 transition-transform duration-300 group-hover:-translate-y-2">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute top-4 left-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-brand-dark font-bold shadow-sm">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-dark mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

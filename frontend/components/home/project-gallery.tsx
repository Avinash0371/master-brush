"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: 'Modern Duplex',
    location: 'Bandra West',
    image: '/images/project_duplex.png',
    category: 'Interior'
  },
  {
    title: 'Minimalist Kitchen',
    location: 'Juhu',
    image: '/images/project_kitchen.png',
    category: 'Wood Finish'
  },
  {
    title: 'Art Deco Feature Wall',
    location: 'Colaba',
    image: '/images/project_feature_wall.png',
    category: 'Texture'
  }
];

export function ProjectGallery() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-brand-secondary font-bold uppercase tracking-wider text-sm">Portfolio</span>
          <h2 className="text-4xl font-serif font-bold text-brand-dark mt-3">Recent Transformations</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            From heritage restorations to modern makeovers, explore how we bring visions to life.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 cursor-pointer"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm mb-3">
                  {project.category}
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mb-1">{project.title}</h3>
                <p className="text-sm text-slate-300 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {project.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <button className="inline-flex items-center gap-2 rounded-full border border-brand-dark px-8 py-3 text-sm font-semibold text-brand-dark transition-all hover:bg-brand-dark hover:text-white">
            View All Projects
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

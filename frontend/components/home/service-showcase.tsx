"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    title: 'Express Painting',
    description: 'Rapid prep to handover in as little as 5 days with dust-free sanding and odour control.',
    image: '/images/service_express.png'
  },
  {
    title: 'Waterproofing',
    description: 'Thermal imaging diagnosis, terrace solutions, and 7-year leakage warranties.',
    image: '/images/service_waterproofing.png'
  },
  {
    title: 'Wood Finishes',
    description: 'Luxe polishes and PU finishes for doors, furniture, and modular kitchens.',
    image: '/images/service_wood.png'
  },
  {
    title: 'Enamel & Metal Care',
    description: 'Rust-proof coatings and high-gloss enamels ideal for grills, gates, and frames.',
    image: '/images/service_metal.png'
  }
];

export function ServiceShowcase() {
  return (
    <section id="services" className="py-24 bg-brand-light">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between mb-12"
        >
          <div className="max-w-2xl">
            <span className="text-brand-secondary font-bold uppercase tracking-wider text-sm">Our Expertise</span>
            <h2 className="text-4xl font-serif font-bold text-brand-dark mt-3">Services crafted for every surface</h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Choose from curated service bundles or customise your project. Every package includes detailed surface health checks, masking, and clean-up.
            </p>
          </div>
          <a
            href="#process"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
          >
            View complete process
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(min-width: 1280px) 20vw, (min-width: 768px) 40vw, 90vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="space-y-3 p-6">
                <h3 className="text-xl font-serif font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{service.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
                <button className="mt-2 flex items-center gap-2 text-sm font-semibold text-brand-primary opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" type="button">
                  Book this service
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { api } from '../lib/api';

const footerNav = [
  {
    title: 'Services',
    links: [
      { name: 'Express Painting', href: '#services' },
      { name: 'Waterproofing', href: '#services' },
      { name: 'Wood Finishes', href: '#services' },
      { name: 'Commercial Projects', href: '#b2b' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Master Brush', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Investors', href: '#investors' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Colour Catalogue', href: '/colour-catalogue' },
      { name: 'Visualiser', href: '/visualiser' },
      { name: 'Painter Partner Program', href: '/become-a-painter' }
    ]
  },
  {
    title: 'Contact',
    links: [
      { name: '+91 63013 13300', href: 'tel:+916301313300' },
      { name: 'sudhimallaavinash00@gmail.com', href: 'mailto:sudhimallaavinash00@gmail.com' },
      { name: 'WhatsApp Us', href: 'https://wa.me/916301313300' }
    ]
  }
];

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email')
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function Footer() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema)
  });
  const [loading, setLoading] = useState(false);

  const onSubscribe = async (values: NewsletterValues) => {
    setLoading(true);
    try {
      await api.post('/api/leads', {
        name: 'Newsletter Subscriber',
        phone: '0000000000', // Placeholder as it's required by schema but not for newsletter
        email: values.email,
        pincode: '0000',
        address: 'Newsletter',
        service_type: 'Newsletter'
      });
      toast.success('Welcome to the Master Brush community!');
      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-xl font-serif font-bold">
                MB
              </span>
              <p className="text-2xl font-serif font-bold">Master Brush</p>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Smart painting services backed by certified professionals, colour science, and delightful project tracking.
            </p>
            <form onSubmit={handleSubmit(onSubscribe)} className="flex flex-col gap-2 w-full max-w-sm" noValidate>
              <div className="flex gap-2">
                <label htmlFor="newsletter-email" className="visually-hidden">
                  Subscribe for updates
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email"
                  {...register('email')}
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-accent transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? '...' : 'Join'}
                </button>
              </div>
              {errors.email && <p className="text-xs text-red-400 ml-4">{errors.email.message}</p>}
            </form>
          </div>
          {footerNav.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-secondary mb-6">{column.title}</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col gap-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Master Brush Services Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="hover:text-white transition-colors">
              Cookie Settings
            </a>
          </div>
          <div className="flex gap-6">
            <a href="https://www.instagram.com" className="hover:text-brand-accent transition-colors" aria-label="Instagram">
              IG
            </a>
            <a href="https://www.youtube.com" className="hover:text-brand-accent transition-colors" aria-label="YouTube">
              YT
            </a>
            <a href="https://www.linkedin.com" className="hover:text-brand-accent transition-colors" aria-label="LinkedIn">
              IN
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

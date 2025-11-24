"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useState } from 'react';

import { api } from '../../lib/api';
import type { LeadPayload } from '../../lib/types';

const schema = z.object({
  name: z.string().min(2, 'Enter your name'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email'),
  pincode: z.string().min(4, 'Enter service pincode'),
  service_type: z.string().min(2, 'Choose a service'),
  area_estimate: z.string().optional(),
  preferred_date: z.string().optional(),
  address: z.string().min(5, 'Add your address'),
  notes: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

const serviceOptions = [
  'Express Painting',
  'Colour Consultation',
  'Waterproofing',
  'Wood Finishes',
  'Exterior Painting'
];

export function LeadCaptureForm({ layout = 'vertical' }: { layout?: 'vertical' | 'stacked' }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      await api.post('/api/leads', {
        ...values,
        area_estimate: values.area_estimate ?? undefined,
        preferred_date: values.preferred_date ? new Date(values.preferred_date).toISOString() : undefined
      } satisfies LeadPayload);
      toast.success('Thanks! Our team will connect soon.');
      reset();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="lead-name" className="block text-sm font-bold text-white/90 mb-2.5">
          Full Name
        </label>
        <input
          id="lead-name"
          type="text"
          placeholder="John Doe"
          {...register('name')}
          className="w-full px-4 py-3.5 bg-white/95 border-2 border-white/20 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium text-base focus:outline-none focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary/20 transition-all duration-200 shadow-sm hover:shadow-md"
        />
        {errors.name && (
          <p className="mt-2 text-sm font-medium text-red-300 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="lead-phone" className="block text-sm font-bold text-white/90 mb-2.5">
          Phone Number
        </label>
        <input
          id="lead-phone"
          type="tel"
          placeholder="+91 98765 43210"
          {...register('phone')}
          className="w-full px-4 py-3.5 bg-white/95 border-2 border-white/20 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium text-base focus:outline-none focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary/20 transition-all duration-200 shadow-sm hover:shadow-md"
        />
        {errors.phone && (
          <p className="mt-2 text-sm font-medium text-red-300 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="lead-email" className="block text-sm font-bold text-white/90 mb-2.5">
          Email Address
        </label>
        <input
          id="lead-email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          className="w-full px-4 py-3.5 bg-white/95 border-2 border-white/20 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium text-base focus:outline-none focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary/20 transition-all duration-200 shadow-sm hover:shadow-md"
        />
        {errors.email && (
          <p className="mt-2 text-sm font-medium text-red-300 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Pincode */}
      <div>
        <label htmlFor="lead-pincode" className="block text-sm font-bold text-white/90 mb-2.5">
          Pincode
        </label>
        <input
          id="lead-pincode"
          type="text"
          placeholder="400001"
          {...register('pincode')}
          className="w-full px-4 py-3.5 bg-white/95 border-2 border-white/20 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium text-base focus:outline-none focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary/20 transition-all duration-200 shadow-sm hover:shadow-md"
        />
        {errors.pincode && (
          <p className="mt-2 text-sm font-medium text-red-300 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.pincode.message}
          </p>
        )}
      </div>

      {/* Service Type */}
      <div>
        <label htmlFor="lead-service" className="block text-sm font-bold text-white/90 mb-2.5">
          Service Type
        </label>
        <select
          id="lead-service"
          {...register('service_type')}
          className="w-full px-4 py-3.5 bg-white/95 border-2 border-white/20 rounded-xl text-slate-900 font-medium text-base focus:outline-none focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary/20 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <option value="">Select a service</option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service_type && (
          <p className="mt-2 text-sm font-medium text-red-300 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.service_type.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="lead-address" className="block text-sm font-bold text-white/90 mb-2.5">
          Address
        </label>
        <textarea
          id="lead-address"
          placeholder="Enter your complete address"
          rows={2}
          {...register('address')}
          className="w-full px-4 py-3.5 bg-white/95 border-2 border-white/20 rounded-xl text-slate-900 placeholder:text-slate-400 font-medium text-base focus:outline-none focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary/20 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
        />
        {errors.address && (
          <p className="mt-2 text-sm font-medium text-red-300 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.address.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-brand-secondary via-yellow-400 to-brand-secondary bg-size-200 px-6 py-4 rounded-xl text-brand-dark font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-brand-secondary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 animate-gradient"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Get Free Quote
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        )}
      </button>
    </form>
  );
}

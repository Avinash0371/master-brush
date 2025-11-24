"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { api } from '../../lib/api';

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  skills: string;
  preferredZones: string;
  notes: string;
  acceptTerms: boolean;
};

const parseList = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

export function PainterApplicationForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      city: '',
      skills: '',
      preferredZones: '',
      notes: '',
      acceptTerms: false
    }
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    const skills = parseList(values.skills);
    const preferredZones = parseList(values.preferredZones);

    if (skills.length === 0) {
      setError('skills', { type: 'manual', message: 'Add at least one skill or surface expertise.' });
      return;
    }

    if (!values.acceptTerms) {
      setError('acceptTerms', { type: 'manual', message: 'You must accept the terms to continue.' });
      return;
    }

    try {
      setSubmitting(true);

      await api.post('/api/painters/apply', {
        full_name: values.fullName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        city: values.city.trim(),
        years_experience: 1, // Default value
        skills: skills,
        preferred_zones: preferredZones.length > 0 ? preferredZones : undefined,
        notes: values.notes.trim() || undefined,
        terms_accepted: true
      });

      toast.success('Application submitted. Our ops team will reach out within one business day.');
      reset();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to submit application';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Field label="Full name" error={errors.fullName?.message}>
        <input
          type="text"
          {...register('fullName', { required: 'Your full name is required.' })}
          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
          placeholder="Rohan Mehta"
        />
      </Field>

      <Field label="Phone number" error={errors.phone?.message}>
        <input
          type="tel"
          {...register('phone', {
            required: 'Phone number is required.',
            minLength: { value: 10, message: 'Enter a valid phone number.' }
          })}
          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
          placeholder="+91 98765 43210"
        />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input
          type="email"
          {...register('email', { required: 'Email is required.' })}
          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
          placeholder="you@example.com"
        />
      </Field>

      <Field label="Operating city" error={errors.city?.message}>
        <input
          type="text"
          {...register('city', { required: 'City is required.' })}
          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
          placeholder="Mumbai"
        />
      </Field>

      <Field
        label="Primary skills"
        hint="Separate each surface or finish with a comma. Example: Interior repaint, Texture, Waterproofing"
        error={errors.skills?.message}
      >
        <textarea
          {...register('skills', { required: 'List at least one skill.' })}
          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all resize-none"
          rows={3}
          placeholder="Interior painting, Exterior painting, Texture work..."
        />
      </Field>

      <Field
        label="Preferred service zones"
        hint="Optional — cities or pin codes. Separate with a comma."
        error={errors.preferredZones?.message}
      >
        <textarea
          {...register('preferredZones')}
          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all resize-none"
          rows={2}
          placeholder="Andheri, Bandra, 400001..."
        />
      </Field>

      <Field
        label="Anything else we should know?"
        hint="Optional project history, certifications, or tools you use."
        error={errors.notes?.message}
      >
        <textarea
          {...register('notes')}
          className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all resize-none"
          rows={3}
          placeholder="Tell us about your experience..."
        />
      </Field>

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            {...register('acceptTerms')}
            className="mt-0.5 h-5 w-5 rounded border-slate-300 text-brand-primary focus:ring-brand-primary transition-all"
          />
          <span className="font-medium">
            I confirm that the information shared is accurate and I agree to Master Brush contacting me for onboarding.
          </span>
        </label>
        {errors.acceptTerms ? (
          <p className="text-sm font-medium text-red-600 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.acceptTerms.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={submitting || isSubmitting}
        className="w-full rounded-xl bg-gradient-to-r from-brand-primary to-brand-dark px-6 py-4 text-base font-bold text-white shadow-xl shadow-brand-primary/30 transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {submitting || isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Submit Application
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        )}
      </button>

      <p className="text-xs text-center text-slate-500">
        <svg className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Typical response time: under 24 hours
      </p>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  children
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-bold text-slate-700">{label}</span>
      {children}
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      {error ? (
        <p className="text-sm font-medium text-red-600 flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      ) : null}
    </label>
  );
}

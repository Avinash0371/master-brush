"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { api } from '../../lib/api';

type ContactFormValues = {
    name: string;
    phone: string;
    email: string;
    pincode: string;
    address: string;
    service_type: string;
    notes: string;
};

export default function ContactPage() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>();

    const onSubmit = async (data: ContactFormValues) => {
        try {
            await api.post('/api/leads', {
                ...data,
                color_pref: undefined,
                area_estimate: undefined,
                preferred_date: undefined
            });
            toast.success('Thank you! We\'ll contact you shortly.');
            reset();
        } catch (err) {
            toast.error('Failed to send message. Please try again later.');
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Have a question or need a quote? Fill out the form below and our team will get back to you within 24 hours.
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                        <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
                        <p className="text-slate-600">+91 63013 13300</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                        <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                        <p className="text-slate-600 break-all">sudhimallaavinash00@gmail.com</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                        <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">Response Time</h3>
                        <p className="text-slate-600">Within 24 hours</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="name">
                                    Full Name *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="phone">
                                    Phone Number *
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    {...register('phone', { required: 'Phone is required', minLength: { value: 10, message: 'Enter valid phone' } })}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
                                    placeholder="+91 98765 43210"
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
                                    Email Address *
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email', { required: 'Email is required' })}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="pincode">
                                    Pincode *
                                </label>
                                <input
                                    id="pincode"
                                    type="text"
                                    {...register('pincode', { required: 'Pincode is required', minLength: { value: 6, message: 'Enter valid pincode' } })}
                                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
                                    placeholder="400001"
                                />
                                {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="service_type">
                                Service Type *
                            </label>
                            <select
                                id="service_type"
                                {...register('service_type', { required: 'Service type is required' })}
                                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
                            >
                                <option value="">Select a service</option>
                                <option value="Express Painting">Express Painting</option>
                                <option value="Premium Painting">Premium Painting</option>
                                <option value="Luxury Painting">Luxury Painting</option>
                                <option value="Waterproofing">Waterproofing</option>
                                <option value="Texture & Design">Texture & Design</option>
                            </select>
                            {errors.service_type && <p className="mt-1 text-sm text-red-600">{errors.service_type.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="address">
                                Address *
                            </label>
                            <input
                                id="address"
                                type="text"
                                {...register('address', { required: 'Address is required' })}
                                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all"
                                placeholder="123 Main Street, City"
                            />
                            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="notes">
                                Additional Details
                            </label>
                            <textarea
                                id="notes"
                                rows={5}
                                {...register('notes')}
                                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all resize-none"
                                placeholder="Tell us more about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-xl bg-gradient-to-r from-brand-primary to-brand-dark px-6 py-4 text-lg font-bold text-white shadow-xl shadow-brand-primary/30 transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

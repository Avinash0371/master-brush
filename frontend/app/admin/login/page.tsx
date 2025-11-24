"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../lib/auth-context';
import toast from 'react-hot-toast';

type LoginFormValues = {
    email: string;
    password: string;
};

export default function AdminLoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>();

    const onSubmit = async (data: LoginFormValues) => {
        const success = await login(data.email, data.password);
        if (success) {
            toast.success('Logged in successfully');
            router.push('/admin');
        } else {
            toast.error('Login failed - Invalid credentials');
        }
    };

    return (
        <section className="max-w-md mx-auto py-12">
            <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', { required: 'Email required' })}
                        className="w-full rounded-md border-gray-300 focus:border-brand-primary focus:ring-brand-primary"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register('password', { required: 'Password required' })}
                        className="w-full rounded-md border-gray-300 focus:border-brand-primary focus:ring-brand-primary"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-brand-primary text-white py-2 font-semibold hover:bg-brand-accent transition"
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </section>
    );
}

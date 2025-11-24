"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LeadsTable } from '../../components/admin/leads-table';
import { PaintersTable } from '../../components/admin/painters-table';
import { useAuth } from '../../lib/auth-context';
import { api } from '../../lib/api';

type TabType = 'dashboard' | 'leads' | 'painters';

export default function AdminPage() {
    const { isAuthenticated, isLoading, logout } = useAuth();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const [stats, setStats] = useState({
        totalLeads: 0,
        totalPainters: 0,
        pendingPainters: 0,
        newLeads: 0,
    });

    const fetchStats = async () => {
        try {
            const leadsData = await api.get('/api/leads');
            const paintersData = await api.get('/api/painters');
            setStats({
                totalLeads: leadsData.meta?.total || leadsData.data?.length || 0,
                totalPainters: paintersData.meta?.total || paintersData.data?.length || 0,
                pendingPainters: paintersData.data?.filter((p: any) => p.status === 'pending').length || 0,
                newLeads: leadsData.data?.filter((l: any) => l.status === 'new').length || 0,
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
            // Set default values on error
            setStats({
                totalLeads: 0,
                totalPainters: 0,
                pendingPainters: 0,
                newLeads: 0,
            });
        }
    };

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/admin/login');
            } else {
                fetchStats();
            }
        }
    }, [isAuthenticated, isLoading, router]);

    // Refresh stats when switching to dashboard tab
    useEffect(() => {
        if (isAuthenticated && activeTab === 'dashboard') {
            fetchStats();
        }
    }, [activeTab, isAuthenticated]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-dark to-brand-primary text-white flex justify-between items-center px-4 py-4">
                <h1 className="text-2xl font-bold">Master Brush Admin</h1>
                <div className="flex gap-3">
                    <button
                        onClick={fetchStats}
                        className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                    </button>
                    <button
                        onClick={handleLogout}
                        className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 lg:px-8 flex gap-8">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`border-b-2 px-1 py-4 text-sm font-semibold ${activeTab === 'dashboard' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('leads')}
                        className={`border-b-2 px-1 py-4 text-sm font-semibold ${activeTab === 'leads' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
                    >
                        Customer Leads
                    </button>
                    <button
                        onClick={() => setActiveTab('painters')}
                        className={`border-b-2 px-1 py-4 text-sm font-semibold ${activeTab === 'painters' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
                    >
                        Painter Applications
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                {activeTab === 'dashboard' && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard title="Total Leads" value={stats.totalLeads} icon="📋" color="blue" />
                        <StatCard title="New Leads" value={stats.newLeads} icon="✨" color="green" />
                        <StatCard title="Total Painters" value={stats.totalPainters} icon="🎨" color="purple" />
                        <StatCard title="Pending Applications" value={stats.pendingPainters} icon="⏳" color="yellow" />
                    </div>
                )}
                {activeTab === 'leads' && <LeadsTable />}
                {activeTab === 'painters' && <PaintersTable />}
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) {
    const colorClasses: Record<string, string> = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        purple: 'from-purple-500 to-purple-600',
        yellow: 'from-yellow-500 to-yellow-600',
    };
    return (
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-600">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
                </div>
                <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${colorClasses[color]} text-3xl shadow-lg`}>{icon}</div>
            </div>
        </div>
    );
}

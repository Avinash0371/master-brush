"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../lib/admin-api';

type Painter = {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    city: string;
    years_experience: number;
    skills: string[];
    status: string;
    expected_rate?: string;
    created_at: string;
    preferred_zones?: string[];
};

export function PaintersTable() {
    const [painters, setPainters] = useState<Painter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchPainters();
    }, [filter]);

    const fetchPainters = async () => {
        try {
            setLoading(true);
            setError(null);
            const url = api.painters.list(filter === 'all' ? undefined : filter);
            const token = localStorage.getItem('admin_token');

            const res = await fetch(url, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            if (res.ok) {
                const data = await res.json();
                setPainters(data.data || []);
            } else {
                throw new Error(`Failed to fetch painters: ${res.statusText}`);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load painters';
            setError(message);
            toast.error(message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string, adminNotes?: string) => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(api.painters.updateStatus(id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    status: newStatus,
                    admin_notes: adminNotes
                })
            });

            if (res.ok) {
                toast.success(`Painter ${newStatus}`);
                fetchPainters();
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            toast.error('Error updating status');
            console.error(error);
        }
    };

    const filteredPainters = painters.filter(painter =>
        painter.full_name.toLowerCase().includes(search.toLowerCase()) ||
        painter.email.toLowerCase().includes(search.toLowerCase()) ||
        painter.phone.includes(search) ||
        painter.city.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Painter Applications</h2>
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                    <button
                        onClick={fetchPainters}
                        className="mt-2 text-sm font-semibold text-red-700 underline"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <input
                    type="text"
                    placeholder="Search by name, email, phone, or city..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 rounded-xl border-2 border-slate-200 px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="rounded-xl border-2 border-slate-200 px-4 py-3 text-sm font-medium focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
                        <p className="mt-4 text-sm text-slate-600">Loading painters...</p>
                    </div>
                ) : filteredPainters.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-slate-600">No painter applications found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Contact</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Location</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Experience</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Skills</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredPainters.map((painter) => (
                                    <tr key={painter.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-slate-900">{painter.full_name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-slate-600">{painter.email}</p>
                                            <p className="text-sm text-slate-600">{painter.phone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-slate-900">{painter.city}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-slate-900">{painter.years_experience} years</p>
                                            {painter.expected_rate && (
                                                <p className="text-xs text-slate-500">{painter.expected_rate}/sq.ft</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {Array.isArray(painter.skills) && painter.skills.slice(0, 2).map((skill, idx) => (
                                                    <span key={idx} className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {Array.isArray(painter.skills) && painter.skills.length > 2 && (
                                                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                                                        +{painter.skills.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={painter.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            {painter.status === 'pending' ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => updateStatus(painter.id, 'approved', 'Application approved')}
                                                        className="rounded-lg bg-green-500 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-green-600"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(painter.id, 'rejected', 'Application rejected')}
                                                        className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-red-600"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <select
                                                    value={painter.status}
                                                    onChange={(e) => updateStatus(painter.id, e.target.value)}
                                                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="approved">Approved</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <p className="text-sm text-slate-600">
                Showing {filteredPainters.length} of {painters.length} applications
            </p>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const colors = {
        pending: 'bg-yellow-100 text-yellow-700',
        approved: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700'
    };

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colors[status as keyof typeof colors] || 'bg-slate-100 text-slate-700'}`}>
            {status}
        </span>
    );
}

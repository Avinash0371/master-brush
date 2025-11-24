"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../lib/admin-api';

type Lead = {
    id: string;
    name: string;
    email: string;
    phone: string;
    service_type: string;
    status: string;
    pincode: string;
    address: string;
    created_at: string;
    preferred_date?: string;
    notes?: string;
};

export function LeadsTable() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchLeads();
    }, [filter]);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            setError(null);
            const url = api.leads.list(filter === 'all' ? undefined : filter);
            const token = localStorage.getItem('admin_token');

            const res = await fetch(url, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            if (res.ok) {
                const data = await res.json();
                setLeads(data.data || []);
            } else {
                throw new Error(`Failed to fetch leads: ${res.statusText}`);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load leads';
            setError(message);
            toast.error(message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(api.leads.updateStatus(id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                toast.success('Status updated');
                fetchLeads();
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            toast.error('Error updating status');
            console.error(error);
        }
    };

    const exportCSV = () => {
        window.open(api.leads.exportCsv(), '_blank');
    };

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search)
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Customer Leads</h2>
                <button
                    onClick={exportCSV}
                    className="rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-brand-dark"
                >
                    Export to CSV
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                    <button
                        onClick={fetchLeads}
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
                    placeholder="Search by name, email, or phone..."
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
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
                        <p className="mt-4 text-sm text-slate-600">Loading leads...</p>
                    </div>
                ) : filteredLeads.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-slate-600">No leads found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Contact</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Service</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Location</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-slate-900">{lead.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-slate-600">{lead.email}</p>
                                            <p className="text-sm text-slate-600">{lead.phone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-slate-900">{lead.service_type}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-slate-600">{lead.pincode}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={lead.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-slate-600">
                                                {new Date(lead.created_at).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateStatus(lead.id, e.target.value)}
                                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="scheduled">Scheduled</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <p className="text-sm text-slate-600">
                Showing {filteredLeads.length} of {leads.length} leads
            </p>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const colors = {
        new: 'bg-blue-100 text-blue-700',
        contacted: 'bg-yellow-100 text-yellow-700',
        scheduled: 'bg-purple-100 text-purple-700',
        completed: 'bg-green-100 text-green-700'
    };

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colors[status as keyof typeof colors] || 'bg-slate-100 text-slate-700'}`}>
            {status}
        </span>
    );
}

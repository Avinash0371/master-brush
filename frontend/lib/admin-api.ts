// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const api = {
    baseUrl: API_BASE_URL,

    // Leads endpoints
    leads: {
        list: (status?: string) =>
            status ? `${API_BASE_URL}/api/leads?status=${status}` : `${API_BASE_URL}/api/leads`,
        updateStatus: (id: string) => `${API_BASE_URL}/api/leads/${id}/status`,
        exportCsv: () => `${API_BASE_URL}/api/leads/export/csv`
    },

    // Painters endpoints
    painters: {
        list: (status?: string) =>
            status ? `${API_BASE_URL}/api/painters?status=${status}` : `${API_BASE_URL}/api/painters`,
        updateStatus: (id: string) => `${API_BASE_URL}/api/painters/${id}/status`
    }
};

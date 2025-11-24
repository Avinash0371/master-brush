const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    return { 'Authorization': `Bearer ${token}` };
  }
  return {};
};

export const api = {
  get: async (url: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`GET ${url} failed`);
    return res.json();
  },
  post: async (url: string, data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `POST ${url} failed`);
    }
    return res.json();
  },
  patch: async (url: string, data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`PATCH ${url} failed`);
    return res.json();
  }
};

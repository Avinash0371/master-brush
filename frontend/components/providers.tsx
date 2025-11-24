"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../lib/auth-context';

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

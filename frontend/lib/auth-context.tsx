"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProps {
    token: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load token from localStorage on mount
        const stored = localStorage.getItem('admin_token');
        if (stored) setToken(stored);
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (!res.ok) throw new Error('Invalid credentials');
            const response = await res.json();
            if (response.success && response.data?.token) {
                setToken(response.data.token);
                localStorage.setItem('admin_token', response.data.token);
                return true;
            }
            return false;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('admin_token');
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

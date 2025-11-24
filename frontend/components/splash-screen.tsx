"use client";

import { useEffect, useState } from 'react';

export function SplashScreen() {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [animationPhase, setAnimationPhase] = useState(0);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        // Phase 1: Paint brush stroke appears (0.5s)
        const phase1 = setTimeout(() => setAnimationPhase(1), 100);

        // Phase 2: Logo reveals (1s)
        const phase2 = setTimeout(() => setAnimationPhase(2), 600);

        // Phase 3: Text appears (1.5s)
        const phase3 = setTimeout(() => setAnimationPhase(3), 1100);

        // Phase 4: Fade out (2.5s)
        const phase4 = setTimeout(() => setAnimationPhase(4), 2500);

        // Remove splash screen (3s)
        const remove = setTimeout(() => setIsVisible(false), 3000);

        return () => {
            clearTimeout(phase1);
            clearTimeout(phase2);
            clearTimeout(phase3);
            clearTimeout(phase4);
            clearTimeout(remove);
        };
    }, [isMounted]);

    if (!isMounted || !isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${animationPhase === 4 ? 'opacity-0' : 'opacity-100'
                }`}
        >
            {/* Paint Brush Stroke SVG Animation */}
            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1920 1080"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Animated paint stroke */}
                <path
                    d="M 100 540 Q 960 300 1820 540"
                    stroke="url(#paintGradient)"
                    strokeWidth="200"
                    strokeLinecap="round"
                    fill="none"
                    className={`transition-all duration-700 ${animationPhase >= 1 ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{
                        strokeDasharray: 2500,
                        strokeDashoffset: animationPhase >= 1 ? 0 : 2500,
                        transition: 'stroke-dashoffset 0.8s ease-out, opacity 0.3s'
                    }}
                />

                <defs>
                    <linearGradient id="paintGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="50%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Content Container */}
            <div className="relative z-10 text-center">
                {/* Logo - Reveals after paint stroke */}
                <div
                    className={`transition-all duration-700 ${animationPhase >= 2
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-50'
                        }`}
                >
                    <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl shadow-yellow-500/50">
                        <svg
                            className="h-20 w-20 text-black"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            {/* Paint brush icon */}
                            <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
                            <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
                        </svg>
                    </div>
                </div>

                {/* Brand Name - Appears after logo */}
                <div
                    className={`transition-all duration-700 ${animationPhase >= 3
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                        }`}
                >
                    <h1 className="text-6xl font-bold text-white lg:text-7xl tracking-tight mb-3">
                        Master Brush
                    </h1>
                    <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full" />
                    <p className="mt-4 text-xl text-yellow-400 font-semibold tracking-widest uppercase">
                        Premium Painting
                    </p>
                </div>
            </div>

            {/* Particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute h-2 w-2 bg-yellow-400 rounded-full transition-all duration-1000 ${animationPhase >= 2 ? 'opacity-0' : 'opacity-70'
                            }`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.1}s`,
                            animation: animationPhase >= 2 ? 'float 1s ease-out forwards' : 'none'
                        }}
                    />
                ))}
            </div>

            <style jsx>{`
        @keyframes float {
          to {
            transform: translateY(-100px);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}

"use client";

import { useEffect, useState } from 'react';

interface Sparkle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
}

export function CursorSparkles() {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        let sparkleId = 0;
        const colors = ['#FFD700', '#FF6B35', '#FFA500', '#FFEB3B', '#FF9800'];

        const handleMouseMove = (e: MouseEvent) => {
            const newSparkle: Sparkle = {
                id: sparkleId++,
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                duration: Math.random() * 400 + 600
            };

            setSparkles(prev => [...prev, newSparkle]);

            // Remove sparkle after animation
            setTimeout(() => {
                setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
            }, newSparkle.duration);
        };

        // Throttle mouse move events
        let throttleTimeout: NodeJS.Timeout | null = null;
        const throttledMouseMove = (e: MouseEvent) => {
            if (!throttleTimeout) {
                handleMouseMove(e);
                throttleTimeout = setTimeout(() => {
                    throttleTimeout = null;
                }, 50); // Create sparkle every 50ms
            }
        };

        window.addEventListener('mousemove', throttledMouseMove);

        return () => {
            window.removeEventListener('mousemove', throttledMouseMove);
            if (throttleTimeout) clearTimeout(throttleTimeout);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50">
            {sparkles.map(sparkle => (
                <div
                    key={sparkle.id}
                    className="absolute animate-sparkle"
                    style={{
                        left: sparkle.x,
                        top: sparkle.y,
                        width: sparkle.size,
                        height: sparkle.size,
                        animationDuration: `${sparkle.duration}ms`
                    }}
                >
                    {/* Star shape sparkle */}
                    <svg
                        viewBox="0 0 24 24"
                        fill={sparkle.color}
                        className="w-full h-full drop-shadow-lg"
                    >
                        <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                    </svg>
                </div>
            ))}
        </div>
    );
}

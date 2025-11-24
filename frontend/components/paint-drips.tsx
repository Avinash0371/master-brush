"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PaintDrip {
    id: number;
    left: string;
    delay: number;
    duration: number;
    color: string;
}

export function PaintDrips() {
    const [drips, setDrips] = useState<PaintDrip[]>([]);

    useEffect(() => {
        // Create random paint drips
        const colors = ['#FFD700', '#FF6B35', '#FFA500', '#4ECDC4', '#95E1D3'];
        const newDrips: PaintDrip[] = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 90 + 5}%`,
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 2,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));
        setDrips(newDrips);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-20 pointer-events-none z-0 overflow-hidden">
            {drips.map((drip) => (
                <motion.div
                    key={drip.id}
                    className="absolute top-0 w-1 opacity-30"
                    style={{
                        left: drip.left,
                        background: `linear-gradient(to bottom, ${drip.color}, transparent)`,
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: '100px' }}
                    transition={{
                        duration: drip.duration,
                        delay: drip.delay,
                        repeat: Infinity,
                        repeatDelay: 5,
                        ease: 'easeInOut'
                    }}
                >
                    {/* Drip blob at the end */}
                    <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                        style={{
                            width: '6px',
                            height: '8px',
                            background: drip.color,
                        }}
                        animate={{
                            scaleY: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: drip.duration + 5,
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
}

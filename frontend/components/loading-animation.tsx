"use client";

import { motion } from 'framer-motion';

export function LoadingAnimation() {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            {/* Paint brush painting a line */}
            <div className="relative w-64 h-24">
                {/* Painted line */}
                <motion.div
                    className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-brand-secondary to-yellow-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />

                {/* Paint brush */}
                <motion.div
                    className="absolute top-0 -translate-y-2"
                    initial={{ left: 0 }}
                    animate={{ left: 'calc(100% - 40px)' }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="#FFD700"
                        className="drop-shadow-lg"
                    >
                        <path d="M20.71 4.63l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z" />
                        <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z" />
                    </svg>
                </motion.div>
            </div>

            {/* Loading text */}
            <motion.p
                className="text-lg font-semibold text-brand-dark"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: 'reverse'
                }}
            >
                Painting your experience...
            </motion.p>

            {/* Paint drops */}
            <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-3 h-3 rounded-full bg-brand-secondary"
                        initial={{ y: 0, opacity: 0.3 }}
                        animate={{ y: [0, -10, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

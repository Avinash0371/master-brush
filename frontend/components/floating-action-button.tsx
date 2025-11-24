"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useModalStore, type ModalState } from '../stores/modal-store';

export function FloatingActionButton() {
    const [isExpanded, setIsExpanded] = useState(false);
    const openLead = useModalStore((state: ModalState) => state.openLead);

    return (
        <motion.div
            className="fixed bottom-8 right-8 z-40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        >
            <motion.button
                onClick={openLead}
                onHoverStart={() => setIsExpanded(true)}
                onHoverEnd={() => setIsExpanded(false)}
                className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-brand-secondary to-yellow-400 px-6 py-4 shadow-2xl shadow-brand-secondary/50 transition-all hover:shadow-2xl hover:shadow-brand-secondary/70"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Paint drop icon */}
                <svg
                    className="w-6 h-6 text-brand-dark"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>

                {/* Expandable text */}
                <motion.span
                    className="font-bold text-brand-dark whitespace-nowrap overflow-hidden"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                        width: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    Get Free Quote
                </motion.span>

                {/* Ripple effect on hover */}
                <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:animate-ping" />
            </motion.button>
        </motion.div>
    );
}

"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeAlt?: string;
    afterAlt?: string;
}

export function BeforeAfterSlider({
    beforeImage,
    afterImage,
    beforeAlt = 'Before',
    afterAlt = 'After'
}: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (clientX: number, rect: DOMRect) => {
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        handleMove(e.clientX, rect);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        handleMove(e.touches[0].clientX, rect);
    };

    return (
        <div
            className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl select-none group"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
        >
            {/* After Image (Background) */}
            <div className="absolute inset-0">
                <Image
                    src={afterImage}
                    alt={afterAlt}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-brand-secondary text-brand-dark px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    After
                </div>
            </div>

            {/* Before Image (Foreground with clip) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <Image
                    src={beforeImage}
                    alt={beforeAlt}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-slate-700 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    Before
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={() => setIsDragging(true)}
            >
                {/* Handle Circle */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-ew-resize"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {/* Arrows */}
                    <svg className="w-6 h-6 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </motion.div>
            </div>

            {/* Instruction hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                ← Drag to compare →
            </div>
        </div>
    );
}

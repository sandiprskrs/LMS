'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface GlassModal3DProps {
    children: React.ReactNode;
    className?: string;
}

const GlassModal3D = ({ children, className = '' }: GlassModal3DProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`backdrop-blur-xl bg-white/10 dark:bg-black/40 border border-white/10 shadow-2xl rounded-2xl p-8 ${className}`}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
        >
            {children}
        </motion.div>
    );
};

export default GlassModal3D;

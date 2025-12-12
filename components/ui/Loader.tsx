'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent';
}

export function Loader({ size = 'md', variant = 'primary' }: LoaderProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };
  
  const variantClasses = {
    primary: 'bg-gradient-primary',
    secondary: 'bg-gradient-secondary',
    accent: 'bg-gradient-accent',
  };
  
  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`rounded-full ${sizeClasses[size]} ${variantClasses[variant]}`}
        style={{
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white 0)',
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white 0)',
        }}
      />
    </div>
  );
}

export function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-shimmer bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`} />
  );
}

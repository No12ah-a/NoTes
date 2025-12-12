'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, FileText, Lightbulb, Bookmark, Edit3 } from 'lucide-react';

interface FloatingIconProps {
  icon: React.ReactNode;
  delay: number;
  duration: number;
  x: string;
  size: number;
  opacity: number;
}

function FloatingIcon({ icon, delay, duration, x, size, opacity }: FloatingIconProps) {
  return (
    <motion.div
      initial={{ y: '100vh', opacity: 0 }}
      animate={{
        y: '-100vh',
        opacity: [0, opacity, opacity, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        position: 'absolute',
        left: x,
        fontSize: `${size}px`,
      }}
      className="pointer-events-none"
    >
      <motion.div
        animate={{
          rotate: [0, 360],
          x: [0, 20, -20, 0],
        }}
        transition={{
          duration: duration / 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}

// Static icon configurations - defined once at module level
const ICON_CONFIGS = [
  { icon: BookOpen, colorClass: 'text-primary-start', size: 40, x: '10%', duration: 20, opacity: 0.12 },
  { icon: PenTool, colorClass: 'text-secondary-start', size: 30, x: '25%', duration: 18, opacity: 0.15 },
  { icon: FileText, colorClass: 'text-accent-start', size: 35, x: '40%', duration: 22, opacity: 0.13 },
  { icon: Lightbulb, colorClass: 'text-primary-start', size: 45, x: '55%', duration: 19, opacity: 0.11 },
  { icon: Bookmark, colorClass: 'text-secondary-start', size: 32, x: '70%', duration: 21, opacity: 0.14 },
  { icon: Edit3, colorClass: 'text-accent-start', size: 38, x: '85%', duration: 17, opacity: 0.12 },
  { icon: BookOpen, colorClass: 'text-accent-start', size: 42, x: '15%', duration: 23, opacity: 0.13 },
  { icon: FileText, colorClass: 'text-primary-start', size: 28, x: '60%', duration: 16, opacity: 0.15 },
  { icon: PenTool, colorClass: 'text-accent-start', size: 36, x: '80%', duration: 24, opacity: 0.11 },
  { icon: Lightbulb, colorClass: 'text-secondary-start', size: 40, x: '30%', duration: 20, opacity: 0.14 },
] as const;

export function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {ICON_CONFIGS.map((config, index) => {
        const IconComponent = config.icon;
        return (
          <FloatingIcon
            key={index}
            icon={<IconComponent className={config.colorClass} />}
            size={config.size}
            x={config.x}
            delay={index * 2}
            duration={config.duration}
            opacity={config.opacity}
          />
        );
      })}
      
      {/* Gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-primary opacity-5 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 right-1/3 w-96 h-96 bg-gradient-secondary opacity-5 rounded-full blur-3xl"
      />
    </div>
  );
}

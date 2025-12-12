'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
}

export function FloatingActionButton({ onClick, className = '' }: FloatingActionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-primary text-white shadow-2xl flex items-center justify-center z-50 ${className}`}
      onClick={onClick}
    >
      <Plus className="w-8 h-8" />
    </motion.button>
  );
}

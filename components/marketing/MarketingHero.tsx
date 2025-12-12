'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const MarketingHero: React.FC = () => {
  const router = useRouter();

  const handleCreateNote = () => {
    router.push('/notes');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900" />
      
      {/* Animated Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-primary opacity-20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-accent opacity-20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Open Book Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <svg
            viewBox="0 0 200 160"
            className="mx-auto w-full max-w-sm h-40"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left Page */}
            <motion.path
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              d="M 20 30 Q 20 20, 30 20 L 95 20 L 95 140 L 30 140 Q 20 140, 20 130 Z"
              fill="url(#pageGradientLeft)"
              stroke="#667eea"
              strokeWidth="2"
            />
            
            {/* Right Page */}
            <motion.path
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              d="M 105 20 L 170 20 Q 180 20, 180 30 L 180 130 Q 180 140, 170 140 L 105 140 Z"
              fill="url(#pageGradientRight)"
              stroke="#764ba2"
              strokeWidth="2"
            />
            
            {/* Spine/Binding */}
            <motion.line
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              x1="100"
              y1="20"
              x2="100"
              y2="140"
              stroke="#667eea"
              strokeWidth="3"
              style={{ transformOrigin: 'center' }}
            />
            
            {/* Decorative Lines (Left Page) */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <line x1="35" y1="40" x2="85" y2="40" stroke="#667eea" strokeWidth="1.5" opacity="0.6" />
              <line x1="35" y1="55" x2="75" y2="55" stroke="#667eea" strokeWidth="1.5" opacity="0.6" />
              <line x1="35" y1="70" x2="80" y2="70" stroke="#667eea" strokeWidth="1.5" opacity="0.6" />
            </motion.g>
            
            {/* Decorative Lines (Right Page) */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <line x1="115" y1="40" x2="165" y2="40" stroke="#764ba2" strokeWidth="1.5" opacity="0.6" />
              <line x1="125" y1="55" x2="165" y2="55" stroke="#764ba2" strokeWidth="1.5" opacity="0.6" />
              <line x1="115" y1="70" x2="160" y2="70" stroke="#764ba2" strokeWidth="1.5" opacity="0.6" />
            </motion.g>
            
            {/* Gradients */}
            <defs>
              <linearGradient id="pageGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.95 }} />
                <stop offset="100%" style={{ stopColor: '#f3e8ff', stopOpacity: 0.95 }} />
              </linearGradient>
              <linearGradient id="pageGradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.95 }} />
                <stop offset="100%" style={{ stopColor: '#fce7f3', stopOpacity: 0.95 }} />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Headline with Open Book Style */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="gradient-text font-['Pacifico',cursive]">NoTes</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 font-['Special_Elite',monospace]"
        >
          Smart Note-Taking for Modern Thinkers
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Privacy-first, AI-powered notes with intelligent organization. 
          No clutter. No complexity. Just your thoughts, beautifully organized.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-primary rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={handleCreateNote}
        >
          Create Your First Note
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-4 text-sm"
        >
          <span className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700">
            ✓ Instant Tags
          </span>
          <span className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700">
            ✓ End-to-End Encryption
          </span>
          <span className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700">
            ✓ Offline-First Sync
          </span>
        </motion.div>
      </div>
    </div>
  );
};

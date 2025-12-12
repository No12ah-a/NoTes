'use client';

import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '🏷️',
    title: 'Instant Tags',
    description: 'Auto-categorize notes with AI-powered tagging. Find anything in seconds.',
  },
  {
    icon: '🔒',
    title: 'End-to-End Encryption',
    description: 'Your notes are encrypted locally. We can&apos;t read them, and neither can anyone else.',
  },
  {
    icon: '📱',
    title: 'Offline-First Sync',
    description: 'Work anywhere, sync everywhere. No internet? No problem.',
  },
];

export const FeatureGrid: React.FC = () => {
  return (
    <div className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for <span className="gradient-text">Power Users</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need, nothing you don&apos;t
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

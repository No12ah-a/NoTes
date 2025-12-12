'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, Type, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  currentScale: number;
  onThemeChange: (theme: string) => void;
  onScaleChange: (scale: number) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  currentTheme,
  currentScale,
  onThemeChange,
  onScaleChange,
}: SettingsModalProps) {
  const themes = [
    { id: 'default', name: 'Default', colors: 'bg-gradient-primary' },
    { id: 'white', name: 'White', colors: 'bg-white border border-gray-300' },
    { id: 'black', name: 'Black', colors: 'bg-gray-900' },
    { id: 'blue', name: 'Blue', colors: 'bg-gradient-accent' },
  ];

  const scales = [
    { value: 0.85, label: 'Small' },
    { value: 1, label: 'Normal' },
    { value: 1.15, label: 'Large' },
    { value: 1.3, label: 'Extra Large' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Settings Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Card variant="glass" className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Settings</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Theme Selection */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Theme</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onThemeChange(theme.id)}
                      className={`p-4 rounded-xl ${theme.colors} ${
                        currentTheme === theme.id
                          ? 'ring-4 ring-purple-500'
                          : ''
                      } transition-all`}
                    >
                      <div className="text-center">
                        <div className="h-16 mb-2 rounded-lg flex items-center justify-center">
                          <span className={`font-semibold ${
                            theme.id === 'white' ? 'text-gray-900' : 'text-white'
                          }`}>
                            Aa
                          </span>
                        </div>
                        <p className={`text-sm font-medium ${
                          theme.id === 'white' ? 'text-gray-900' : 'text-white'
                        }`}>
                          {theme.name}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Scaling Size */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Type className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Text Scale</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {scales.map((scale) => (
                    <motion.button
                      key={scale.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onScaleChange(scale.value)}
                      className={`p-4 rounded-xl border-2 ${
                        currentScale === scale.value
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-gray-300 dark:border-gray-700'
                      } transition-all`}
                    >
                      <p className="font-medium">{scale.label}</p>
                      <p className="text-xs text-gray-500 mt-1">{scale.value}x</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Exit Button */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="primary"
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Close Settings
                </Button>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Sparkles, Brain, Lightbulb, BookOpen, Code, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface TagsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTag: (tag: string) => void;
  selectedTags: string[];
}

// AI-related statically generated tags
const AI_TAGS = [
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    icon: Brain,
    description: 'Notes about ML algorithms, models, and training',
    color: 'primary',
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    icon: Cpu,
    description: 'Neural networks, CNNs, RNNs, and transformers',
    color: 'accent',
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing',
    icon: BookOpen,
    description: 'Text processing, sentiment analysis, and language models',
    color: 'secondary',
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    icon: Sparkles,
    description: 'Image recognition, object detection, and segmentation',
    color: 'primary',
  },
  {
    id: 'ai-research',
    name: 'AI Research',
    icon: Lightbulb,
    description: 'Research papers, breakthroughs, and innovations',
    color: 'accent',
  },
  {
    id: 'ai-coding',
    name: 'AI Coding',
    icon: Code,
    description: 'AI-assisted programming and code generation',
    color: 'secondary',
  },
  {
    id: 'data-science',
    name: 'Data Science',
    icon: Brain,
    description: 'Data analysis, visualization, and statistical methods',
    color: 'primary',
  },
  {
    id: 'ai-ethics',
    name: 'AI Ethics',
    icon: Sparkles,
    description: 'Responsible AI, bias, fairness, and transparency',
    color: 'accent',
  },
  {
    id: 'reinforcement-learning',
    name: 'Reinforcement Learning',
    icon: Cpu,
    description: 'Agents, rewards, Q-learning, and policy optimization',
    color: 'secondary',
  },
  {
    id: 'generative-ai',
    name: 'Generative AI',
    icon: Sparkles,
    description: 'GPT, DALL-E, diffusion models, and content generation',
    color: 'primary',
  },
  {
    id: 'ai-tools',
    name: 'AI Tools',
    icon: Code,
    description: 'Libraries, frameworks, and development tools',
    color: 'accent',
  },
  {
    id: 'ai-applications',
    name: 'AI Applications',
    icon: Lightbulb,
    description: 'Real-world use cases and implementations',
    color: 'secondary',
  },
];

export function TagsModal({ isOpen, onClose, onSelectTag, selectedTags }: TagsModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTags = AI_TAGS.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTagClick = (tagId: string) => {
    onSelectTag(tagId);
  };

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

          {/* Tags Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Card variant="glass" className="w-full max-w-4xl max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Tag className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold">AI Tags Library</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search AI tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Selected Tags */}
              {selectedTags.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                  <p className="text-sm font-semibold mb-2">Selected Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tagId) => {
                      const tag = AI_TAGS.find((t) => t.id === tagId);
                      if (!tag) return null;
                      return (
                        <Badge key={tagId} variant={tag.color as 'primary' | 'secondary' | 'accent'}>
                          {tag.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tags Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {filteredTags.map((tag) => {
                  const IconComponent = tag.icon;
                  const isSelected = selectedTags.includes(tag.id);
                  
                  return (
                    <motion.button
                      key={tag.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTagClick(tag.id)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500'
                          : 'bg-white dark:bg-gray-800 border-2 border-transparent hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          tag.color === 'primary' ? 'bg-gradient-primary' :
                          tag.color === 'secondary' ? 'bg-gradient-secondary' :
                          'bg-gradient-accent'
                        }`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{tag.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {tag.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Close Button */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="primary"
                  onClick={onClose}
                  className="w-full"
                >
                  Done
                </Button>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

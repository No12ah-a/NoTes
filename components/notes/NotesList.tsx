'use client';

import React from 'react';
import { NoteCard } from './NoteCard';
import { StaggerChildren, staggerItem } from '@/components/animations/StaggerChildren';
import { motion } from 'framer-motion';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
}

interface NotesListProps {
  notes: Note[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
}

export function NotesList({ notes, onEdit, onDelete, onShare }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-primary opacity-20 animate-float" />
        </motion.div>
        <h3 className="text-2xl font-semibold mb-2">No notes yet</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Start creating your first note to get started
        </p>
      </div>
    );
  }
  
  return (
    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {notes.map((note) => (
        <motion.div key={note.id} variants={staggerItem}>
          <NoteCard
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
            onShare={onShare}
          />
        </motion.div>
      ))}
    </StaggerChildren>
  );
}

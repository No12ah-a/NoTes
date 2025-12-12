'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Share2, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDistanceToNow } from 'date-fns';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
}

interface NoteCardProps {
  note: Note;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete, onShare }: NoteCardProps) {
  const [showActions, setShowActions] = React.useState(false);
  
  const categoryColors: Record<string, any> = {
    Personal: 'primary',
    Work: 'accent',
    Ideas: 'secondary',
    default: 'default',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setShowActions(true)}
      onHoverEnd={() => setShowActions(false)}
      className="relative"
    >
      <Card hover className="relative overflow-hidden">
        {/* Category indicator strip */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-${categoryColors[note.category] || 'default'}`} />
        
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="flex-1 pr-2">{note.title}</CardTitle>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: showActions ? 1 : 0,
                scale: showActions ? 1 : 0.8 
              }}
              className="flex gap-2"
            >
              <ActionButton icon={<Edit className="w-4 h-4" />} onClick={() => onEdit?.(note.id)} />
              <ActionButton icon={<Share2 className="w-4 h-4" />} onClick={() => onShare?.(note.id)} />
              <ActionButton icon={<Trash2 className="w-4 h-4" />} onClick={() => onDelete?.(note.id)} danger />
            </motion.div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Content preview */}
          <div className="relative">
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
              {note.content}
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-800 to-transparent" />
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {note.tags.map((tag) => (
              <Badge key={tag} size="sm" variant="primary">
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Timestamp */}
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{formatDistanceToNow(note.createdAt, { addSuffix: true })}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}

function ActionButton({ icon, onClick, danger = false }: ActionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${
        danger 
          ? 'hover:bg-red-100 dark:hover:bg-red-900 text-red-600' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
    </motion.button>
  );
}

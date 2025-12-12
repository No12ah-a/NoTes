'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, Save, Sparkles, Bold, Italic, List, Code } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface NoteEditorProps {
  isOpen: boolean;
  onClose: () => void;
  note?: {
    id?: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
  };
  onSave?: (note: {
    id?: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    updatedAt?: Date;
  }) => void;
}

export function NoteEditor({ isOpen, onClose, note, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 500));
    onSave?.({
      id: note?.id,
      title,
      content,
      category: note?.category || 'Personal',
      tags: note?.tags || [],
      updatedAt: new Date(),
    });
    setIsSaving(false);
  };
  
  const insertMarkdown = (syntax: string, placeholder: string = '') => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || placeholder;
    const newText = content.substring(0, start) + syntax.replace('{}', selectedText) + content.substring(end);
    
    setContent(newText);
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          {/* Editor Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 bottom-0 z-50 ${
              isFullscreen ? 'left-0' : 'w-full md:w-2/3 lg:w-1/2'
            }`}
          >
            <Card variant="default" className="h-full flex flex-col m-4">
              {/* Toolbar */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200/20 dark:border-gray-700/20">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => insertMarkdown('**{}**', 'bold')}
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => insertMarkdown('*{}*', 'italic')}
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => insertMarkdown('\n- {}', 'list item')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => insertMarkdown('`{}`', 'code')}
                  >
                    <Code className="w-4 h-4" />
                  </Button>
                  
                  <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />
                  
                  <Button
                    variant="accent"
                    size="sm"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Enhance
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? 'Edit' : 'Preview'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Title Input */}
              <div className="p-4 border-b border-gray-200/20 dark:border-gray-700/20">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note title..."
                  className="w-full text-2xl font-bold bg-transparent outline-none"
                />
              </div>
              
              {/* Content Area */}
              <div className="flex-1 overflow-hidden">
                {showPreview ? (
                  <div className="h-full overflow-y-auto p-6 prose dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing your note..."
                    className="w-full h-full p-6 bg-transparent outline-none resize-none"
                  />
                )}
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between p-4 border-t border-gray-200/20 dark:border-gray-700/20">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {content.split(/\s+/).filter(Boolean).length} words • {content.length} characters
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: isSaving ? 1 : 0 }}
                    className="text-sm text-gray-500 dark:text-gray-400"
                  >
                    Saving...
                  </motion.div>
                  <Button variant="primary" onClick={handleSave} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Note
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, Check, Sparkles, Bold, Italic, List, Code, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
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
  const [fontFamily, setFontFamily] = useState('Special Elite');
  const [fontSize, setFontSize] = useState('16');
  
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
          
          {/* Editor Panel - Center Aligned */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card variant="glass" className={`w-full ${
              isFullscreen ? 'h-full' : 'max-w-5xl max-h-[95vh]'
            } flex flex-col`}>
              {/* Microsoft Word-Style Toolbar */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
                {/* Top Row - Font Selection */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Font Family Dropdown */}
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm min-w-[160px]"
                    >
                      <option value="Special Elite">Special Elite (Typewriter)</option>
                      <option value="Courier Prime">Courier Prime</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Arial">Arial</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Comic Sans MS">Comic Sans MS</option>
                      <option value="Trebuchet MS">Trebuchet MS</option>
                      <option value="Impact">Impact</option>
                    </select>
                    
                    {/* Font Size Dropdown */}
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm min-w-[70px]"
                    >
                      <option value="12">12</option>
                      <option value="14">14</option>
                      <option value="16">16</option>
                      <option value="18">18</option>
                      <option value="20">20</option>
                      <option value="24">24</option>
                      <option value="28">28</option>
                      <option value="32">32</option>
                      <option value="36">36</option>
                      <option value="48">48</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
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
                
                {/* Second Row - Formatting Options */}
                <div className="flex items-center justify-between p-2 px-3">
                  <div className="flex items-center gap-1 flex-wrap">
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
                      onClick={() => insertMarkdown('__{}_', 'underline')}
                    >
                      <Underline className="w-4 h-4" />
                    </Button>
                    
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <AlignRight className="w-4 h-4" />
                    </Button>
                    
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />
                    
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
                    
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />
                    
                    <Button
                      variant="accent"
                      size="sm"
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
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
                  </div>
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
              <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900">
                {showPreview ? (
                  <div 
                    className="h-full overflow-y-auto p-6 prose dark:prose-invert max-w-none"
                    style={{ fontFamily: fontFamily, fontSize: `${fontSize}px` }}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing your note..."
                    className="w-full h-full p-6 bg-transparent outline-none resize-none typewriter-font"
                    style={{ fontFamily: fontFamily, fontSize: `${fontSize}px`, lineHeight: '1.6' }}
                  />
                )}
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between p-4 border-t border-gray-200/20 dark:border-gray-700/20 bg-white/90 dark:bg-gray-800/90">
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
                    <Check className="w-4 h-4 mr-2" />
                    Done
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

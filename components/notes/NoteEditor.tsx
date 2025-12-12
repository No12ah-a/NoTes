'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, Check, Sparkles, Bold, Italic, List, Code, Underline, AlignLeft, AlignCenter, AlignRight, Tag, Plus } from 'lucide-react';
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
  existingTags?: string[]; // All tags used across notes for autocomplete
}

export function NoteEditor({ isOpen, onClose, note, onSave, existingTags = [] }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fontFamily, setFontFamily] = useState('Special Elite');
  const [fontSize, setFontSize] = useState('16');
  
  // Tags feature state
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedAutocompleteIndex, setSelectedAutocompleteIndex] = useState(0);
  const tagInputRef = useRef<HTMLInputElement>(null);
  
  const MAX_TAGS = 20;
  const MAX_TAG_LENGTH = 30;
  
  // Get autocomplete suggestions
  const getAutocompleteSuggestions = () => {
    if (!tagInput.trim()) return [];
    const input = tagInput.toLowerCase();
    return existingTags
      .filter(tag => 
        tag.toLowerCase().includes(input) && 
        !tags.some(t => t.toLowerCase() === tag.toLowerCase())
      )
      .slice(0, 5);
  };
  
  const autocompleteSuggestions = getAutocompleteSuggestions();
  
  // Add tag from input
  const addTag = (tagText: string) => {
    const trimmedTag = tagText.trim().substring(0, MAX_TAG_LENGTH);
    if (!trimmedTag) return;
    
    // Check if tag already exists (case-insensitive)
    const tagLower = trimmedTag.toLowerCase();
    if (tags.some(t => t.toLowerCase() === tagLower)) {
      // Silently merge duplicates
      setTagInput('');
      return;
    }
    
    // Check max tags limit
    if (tags.length >= MAX_TAGS) {
      return;
    }
    
    setTags([...tags, trimmedTag]);
    setTagInput('');
    setShowAutocomplete(false);
  };
  
  // Handle tag input
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
    setShowAutocomplete(value.trim().length > 0);
    setSelectedAutocompleteIndex(0);
  };
  
  // Handle tag input key press
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (showAutocomplete && autocompleteSuggestions.length > 0) {
        addTag(autocompleteSuggestions[selectedAutocompleteIndex]);
      } else {
        addTag(tagInput);
      }
    } else if (e.key === ',' || e.key === ' ') {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedAutocompleteIndex(prev => 
        Math.min(prev + 1, autocompleteSuggestions.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedAutocompleteIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Escape') {
      setShowAutocomplete(false);
    }
  };
  
  // Remove tag
  const removeTag = (index: number) => {
    const removedTag = tags[index];
    setTags(tags.filter((_, i) => i !== index));
    
    // Announce to screen reader
    if (typeof window !== 'undefined') {
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = `Tag removed: ${removedTag}`;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 500));
    onSave?.({
      id: note?.id,
      title,
      content,
      category: note?.category || 'Personal',
      tags,
      updatedAt: new Date(),
    });
    setIsSaving(false);
    onClose();
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
                  aria-label="Note title"
                />
              </div>
              
              {/* Tags Row - Directly under title */}
              <div className="px-4 py-3 border-b border-gray-200/20 dark:border-gray-700/20 bg-gray-50/50 dark:bg-gray-800/50">
                <button
                  onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                  className="flex items-center gap-2 w-full text-left group"
                  aria-expanded={isTagsExpanded}
                  aria-label="Tags section"
                >
                  <Tag className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tags {tags.length > 0 && `(${tags.length})`}
                  </span>
                  {tags.length > 0 && !isTagsExpanded && (
                    <div className="flex items-center gap-1 ml-2 overflow-hidden">
                      {tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 rounded-full text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {tags.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </button>
                
                <AnimatePresence>
                  {isTagsExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 overflow-hidden"
                    >
                      {/* Existing Tags Chips */}
                      <div className="flex flex-wrap gap-2 mb-3" role="list" aria-label="Current tags">
                        {tags.map((tag, index) => (
                          <motion.div
                            key={index}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            role="listitem"
                            className="group relative"
                          >
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium shadow-sm hover:shadow-md transition-all">
                              {tag}
                              <button
                                onClick={() => removeTag(index)}
                                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                aria-label={`Remove tag ${tag}`}
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </span>
                          </motion.div>
                        ))}
                        
                        {/* Add Tag Chip */}
                        {tags.length < MAX_TAGS && (
                          <div className="relative">
                            <button
                              onClick={() => {
                                setTagInput(' ');
                                setTimeout(() => tagInputRef.current?.focus(), 10);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                              aria-label="Add new tag"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Add tag
                            </button>
                            <input
                              ref={tagInputRef}
                              type="text"
                              value={tagInput}
                              onChange={handleTagInputChange}
                              onKeyDown={handleTagInputKeyDown}
                              onFocus={() => setTagInput('')}
                              onBlur={() => {
                                if (tagInput.trim()) {
                                  addTag(tagInput);
                                } else {
                                  setTagInput('');
                                }
                                setTimeout(() => setShowAutocomplete(false), 200);
                              }}
                              placeholder="Type tag name..."
                              maxLength={MAX_TAG_LENGTH}
                              className="absolute top-0 left-0 opacity-0 pointer-events-none px-3 py-1.5 rounded-full bg-white dark:bg-gray-700 border-2 border-purple-500 text-sm font-medium outline-none min-w-[120px] focus:opacity-100 focus:pointer-events-auto"
                              aria-label="Tag input"
                              aria-describedby="tag-help"
                            />
                            
                            {/* Autocomplete Dropdown */}
                            {showAutocomplete && autocompleteSuggestions.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-full mt-1 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-10 min-w-[200px]"
                                role="listbox"
                                aria-label="Tag suggestions"
                              >
                                {autocompleteSuggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    onClick={() => addTag(suggestion)}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors ${
                                      index === selectedAutocompleteIndex 
                                        ? 'bg-purple-100 dark:bg-purple-900/30' 
                                        : ''
                                    }`}
                                    role="option"
                                    aria-selected={index === selectedAutocompleteIndex}
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <p id="tag-help" className="text-xs text-gray-500 dark:text-gray-400">
                        Press comma or space to add tags. Max {MAX_TAGS} tags, {MAX_TAG_LENGTH} characters each.
                        {tags.length >= MAX_TAGS && ' Tag limit reached.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
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

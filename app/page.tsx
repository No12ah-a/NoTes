'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { NotesList } from '@/components/notes/NotesList';
import { NoteEditor } from '@/components/notes/NoteEditor';
import { SearchBar } from '@/components/notes/SearchBar';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';
import { Statistics } from '@/components/dashboard/Statistics';
import { GradientText } from '@/components/ui/GradientText';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ToastProvider, toast } from '@/components/ui/Toast';
import { SettingsModal } from '@/components/modals/SettingsModal';
import { TagsModal } from '@/components/modals/TagsModal';
import { Sparkles } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { BackgroundAnimation } from '@/components/animations/BackgroundAnimation';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
}

// Static sample notes to avoid re-creating on each render
const SAMPLE_NOTES: Note[] = [
  {
    id: '1',
    title: 'Welcome to NoTes',
    content: 'This is your modern AI-powered note-taking application with a beautiful interface. Start by creating your first note with the + button below.',
    category: 'Personal',
    tags: ['welcome', 'getting-started'],
    createdAt: new Date('2024-01-01T12:00:00'),
  },
  {
    id: '2',
    title: 'Project Ideas',
    content: 'Build a next-generation note-taking app with AI features, modern UI, and seamless user experience.',
    category: 'Ideas',
    tags: ['project', 'ai', 'notes'],
    createdAt: new Date('2024-01-01T11:00:00'),
  },
  {
    id: '3',
    title: 'Meeting Notes',
    content: 'Discussed the new design system implementation. Key points: glassmorphism, gradient accents, smooth animations.',
    category: 'Work',
    tags: ['meeting', 'design'],
    createdAt: new Date('2023-12-31T12:00:00'),
  },
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>(SAMPLE_NOTES);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [textScale, setTextScale] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleNavigate = (page: string) => {
    if (page === 'Settings') {
      setSettingsOpen(true);
    } else if (page === 'Tags') {
      setTagsOpen(true);
    } else {
      toast.success(`${page} feature coming soon!`);
    }
  };
  
  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    toast.success(`Theme changed to ${theme}`);
    
    // Apply theme changes
    const root = document.documentElement;
    if (theme === 'white') {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--foreground', '#000000');
    } else if (theme === 'black') {
      root.style.setProperty('--background', '#000000');
      root.style.setProperty('--foreground', '#ffffff');
    } else if (theme === 'blue') {
      root.style.setProperty('--background', '#0a1929');
      root.style.setProperty('--foreground', '#e3f2fd');
    } else {
      root.style.setProperty('--background', '#fafafa');
      root.style.setProperty('--foreground', '#171717');
    }
  };
  
  const handleScaleChange = (scale: number) => {
    setTextScale(scale);
    document.documentElement.style.fontSize = `${scale * 16}px`;
    toast.success(`Text scale set to ${scale}x`);
  };
  
  const handleSelectTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };
  
  // Apply text scale on mount
  useEffect(() => {
    document.documentElement.style.fontSize = `${textScale * 16}px`;
  }, [textScale]);
  
  const handleNewNote = () => {
    setSelectedNote(null);
    setEditorOpen(true);
  };
  
  const handleEdit = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setSelectedNote(note);
      setEditorOpen(true);
    }
  };
  
  const handleDelete = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast.success('Note deleted successfully');
  };
  
  const handleShare = () => {
    toast.success('Note link copied to clipboard');
  };
  
  const handleSave = (note: Partial<Note> & { id?: string }) => {
    if (note.id) {
      // Update existing note
      setNotes(notes.map(n => n.id === note.id ? { ...n, ...note } as Note : n));
      toast.success('Note updated successfully');
    } else {
      // Create new note
      const newNote: Note = {
        id: String(Date.now()),
        title: note.title || 'Untitled',
        content: note.content || '',
        category: note.category || 'Personal',
        tags: note.tags || [],
        createdAt: new Date(),
      };
      setNotes([newNote, ...notes]);
      toast.success('Note created successfully');
    }
    setEditorOpen(false);
  };
  
  return (
    <>
      <ToastProvider />
      <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark relative">
        {/* Background Animation */}
        <BackgroundAnimation />
      {/* Header */}
      <FadeIn>
        <header className="fixed top-0 left-0 right-0 z-30 glass border-b border-gray-200/20 dark:border-gray-700/20 relative">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold app-title">
                  <GradientText>NoTes</GradientText>
                </h1>
              </div>
              
              <div className="hidden md:block flex-1 max-w-xl mx-8">
                <SearchBar onSearch={setSearchQuery} />
              </div>
              
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Button variant="primary" size="sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Assist
                </Button>
              </div>
            </div>
            
            {/* Mobile search */}
            <div className="md:hidden mt-4">
              <SearchBar onSearch={setSearchQuery} />
            </div>
          </div>
        </header>
      </FadeIn>
      
      {/* Main Layout */}
      <div className="flex pt-24 md:pt-28 relative z-10">
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={handleNavigate}
        />
        
        <main className="flex-1 min-h-screen relative">
          {/* Statistics */}
          <div className="p-6">
            <Statistics />
          </div>
          
          {/* Notes List */}
          <NotesList
            notes={filteredNotes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShare={handleShare}
          />
        </main>
      </div>
      
      {/* Note Editor */}
      <NoteEditor
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        note={selectedNote || undefined}
        onSave={handleSave}
        existingTags={Array.from(new Set(notes.flatMap(n => n.tags)))}
      />
      
      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        currentTheme={currentTheme}
        currentScale={textScale}
        onThemeChange={handleThemeChange}
        onScaleChange={handleScaleChange}
      />
      
      {/* Tags Modal */}
      <TagsModal
        isOpen={tagsOpen}
        onClose={() => setTagsOpen(false)}
        onSelectTag={handleSelectTag}
        selectedTags={selectedTags}
      />
      
      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleNewNote} />
    </div>
    </>
  );
}

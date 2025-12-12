'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { NotesList } from '@/components/notes/NotesList';
import { SearchBar } from '@/components/notes/SearchBar';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';
import { GradientText } from '@/components/ui/GradientText';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Sparkles } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample notes data
  const sampleNotes = [
    {
      id: '1',
      title: 'Welcome to NoTes',
      content: 'This is your modern AI-powered note-taking application with a beautiful interface. Start by creating your first note with the + button below.',
      category: 'Personal',
      tags: ['welcome', 'getting-started'],
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Project Ideas',
      content: 'Build a next-generation note-taking app with AI features, modern UI, and seamless user experience.',
      category: 'Ideas',
      tags: ['project', 'ai', 'notes'],
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: '3',
      title: 'Meeting Notes',
      content: 'Discussed the new design system implementation. Key points: glassmorphism, gradient accents, smooth animations.',
      category: 'Work',
      tags: ['meeting', 'design'],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
  ];
  
  const [notes, setNotes] = useState(sampleNotes);
  
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleNewNote = () => {
    console.log('Create new note');
  };
  
  const handleEdit = (id: string) => {
    console.log('Edit note:', id);
  };
  
  const handleDelete = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };
  
  const handleShare = (id: string) => {
    console.log('Share note:', id);
  };
  
  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      {/* Header */}
      <FadeIn>
        <header className="fixed top-0 left-0 right-0 z-30 glass border-b border-gray-200/20 dark:border-gray-700/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold">
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
      <div className="flex pt-24 md:pt-28">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 min-h-screen">
          <NotesList
            notes={filteredNotes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShare={handleShare}
          />
        </main>
      </div>
      
      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleNewNote} />
    </div>
  );
}

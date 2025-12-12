'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, Tag, Settings, Menu } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const categories = [
    { name: 'All Notes', count: 42, color: 'primary' },
    { name: 'Personal', count: 15, color: 'secondary' },
    { name: 'Work', count: 20, color: 'accent' },
    { name: 'Ideas', count: 7, color: 'primary' },
  ];
  
  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -300,
        }}
        className={`fixed lg:relative inset-y-0 left-0 z-40 w-72 p-4 ${!isOpen && 'hidden lg:block'}`}
      >
        <Card variant="glass" className="h-full flex flex-col">
          {/* Avatar section */}
          <div className="mb-6 text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
              AI
            </div>
            <h2 className="text-lg font-semibold">AI Notes</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Smart note-taking</p>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <NavItem icon={<Home className="w-5 h-5" />} label="Home" active />
            <NavItem icon={<Search className="w-5 h-5" />} label="Search" />
            <NavItem icon={<Tag className="w-5 h-5" />} label="Tags" />
            <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
          </nav>
          
          {/* Categories */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3 text-gray-500 dark:text-gray-400">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <motion.div
                  key={category.name}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <span className="text-sm">{category.name}</span>
                  <Badge variant={category.color as any} size="sm">
                    {category.count}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.aside>
    </>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
        active 
          ? 'bg-gradient-primary text-white' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </motion.div>
  );
}

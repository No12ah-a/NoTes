'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search notes...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };
  
  const handleClear = () => {
    setQuery('');
    onSearch('');
  };
  
  return (
    <div className="relative">
      <motion.div
        animate={{
          boxShadow: isFocused 
            ? '0 0 0 3px rgba(102, 126, 234, 0.3)' 
            : '0 0 0 0px rgba(102, 126, 234, 0)',
        }}
        className="relative flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm"
      >
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-3 bg-transparent outline-none"
        />
        
        <div className="absolute right-2 flex items-center gap-2">
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClear}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-gradient-primary text-white rounded-lg"
          >
            <Filter className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

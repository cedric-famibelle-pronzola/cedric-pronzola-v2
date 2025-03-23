'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('theme');

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get the current theme icon based on the active theme
  const getCurrentThemeIcon = () => {
    if (!mounted) return null;
    
    const displayTheme = theme === 'system' ? resolvedTheme : theme;
    
    switch(displayTheme) {
      case 'light':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        );
      case 'dark':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        );
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="p-2 hover:bg-foreground/10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-focus-ring cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('toggle')}
      >
        {mounted ? getCurrentThemeIcon() : 
          <div className="w-5 h-5" /> /* Placeholder with same dimensions */}
      </button>
      
      <AnimatePresence>
        {mounted && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-background border border-foreground/10 rounded-md shadow-lg z-50"
          >
            <div className="p-1">
              <button
                onClick={() => {
                  setTheme('light');
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md cursor-pointer ${
                  theme === 'light' ? 'bg-foreground/10 font-medium' : 'hover:bg-foreground/5'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                {t('light')}
              </button>
              
              <button
                onClick={() => {
                  setTheme('dark');
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md cursor-pointer ${
                  theme === 'dark' ? 'bg-foreground/10 font-medium' : 'hover:bg-foreground/5'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                {t('dark')}
              </button>
              
              <button
                onClick={() => {
                  setTheme('system');
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md cursor-pointer ${
                  theme === 'system' ? 'bg-foreground/10 font-medium' : 'hover:bg-foreground/5'
                }`}
              >
                <div className="relative mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  
                  {theme === 'system' && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full" 
                         style={{ 
                           backgroundColor: resolvedTheme === 'dark' ? '#818cf8' : '#4f46e5',
                           boxShadow: `0 0 2px ${resolvedTheme === 'dark' ? '#818cf8' : '#4f46e5'}`
                         }} 
                    />
                  )}
                </div>
                {t('system')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
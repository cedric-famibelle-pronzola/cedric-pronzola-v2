'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark'; // The actual applied theme (resolved from system if needed)
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Check for stored theme once mounted on client
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
      setTheme(storedTheme);
    }
  }, []);
  
  // Update theme when it changes and handle system preference
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    if (theme === 'system') {
      // For system preference, we need to listen to changes
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      
      const updateSystemTheme = () => {
        const isDark = prefersDark.matches;
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
        setResolvedTheme(isDark ? 'dark' : 'light');
      };
      
      updateSystemTheme(); // Set initial value
      
      // Listen for system preference changes
      prefersDark.addEventListener('change', updateSystemTheme);
      
      // Store in localStorage
      localStorage.removeItem('theme');
      
      return () => {
        prefersDark.removeEventListener('change', updateSystemTheme);
      };
    } else {
      // For explicit theme settings
      root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      setResolvedTheme(theme);
    }
  }, [theme, mounted]);

  // Value to provide to consumers
  const value = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
} 
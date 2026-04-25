'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { defaultTheme, themes, type ThemeKey } from '@/styles/themes';

interface ThemeContextValue {
  theme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>(defaultTheme);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemeKey | null;
    if (stored && stored in themes) {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: ThemeKey) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

import { useState, useEffect, type ReactNode } from 'react';
import type { Theme } from '@shared/model';
import { THEME_KEY, DEFAULT_THEME } from '@shared/config';
import { ThemeContext } from '@shared/lib';

interface ThemeProviderProps {
  children: ReactNode;
}


const initTheme = (): Theme => {
  let theme: Theme = DEFAULT_THEME;

  try {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    } else {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : DEFAULT_THEME;
    }
  } catch {
    /* localStorage unavailable — use default */
  }

  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(initTheme);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      document.documentElement.classList.remove('theme-init');
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (nextTheme: Theme) => {
    document.documentElement.setAttribute('data-theme', nextTheme);
    setThemeState(nextTheme);
    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch {
      /* fail silently */
    }
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

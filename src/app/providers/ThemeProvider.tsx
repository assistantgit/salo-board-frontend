import { DEFAULT_THEME, THEME_KEY } from '@shared/config';
import { ThemeContext } from '@shared/lib';
import type { Theme } from '@shared/model';
import { type ReactNode, useEffect, useState } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

const readTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    return stored === 'light' || stored === 'dark' ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(readTheme);

  // Remove .theme-init after first paint so CSS transitions re-enable.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      document.documentElement.classList.remove('theme-init');
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const setTheme = (next: Theme) => {
    document.documentElement.setAttribute('data-theme', next);
    setThemeState(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'), setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

import type { Theme } from '@shared/model';

export const THEME_KEY = 'app-theme' as const;

export const DEFAULT_THEME: Theme = 'light';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const satisfies Record<string, Theme>;

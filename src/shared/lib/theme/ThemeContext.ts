import { createContext } from 'react';
import type { ThemeContextValue } from '@shared/model';

export const ThemeContext = createContext<ThemeContextValue | null>(null);

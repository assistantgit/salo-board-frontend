import type { ThemeContextValue } from '@shared/model';
import { createContext } from 'react';

export const ThemeContext = createContext<ThemeContextValue | null>(null);

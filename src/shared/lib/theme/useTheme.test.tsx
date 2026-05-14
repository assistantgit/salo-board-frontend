import { renderHook } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it } from 'vitest';
import { ThemeContext } from './ThemeContext';
import { useTheme } from './useTheme';

describe('useTheme', () => {
  it('should return theme context when used within provider', () => {
    const mockContext = {
      theme: 'dark' as const,
      setTheme: () => {},
      toggleTheme: () => {},
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={mockContext}>{children}</ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('dark');
  });

  it('should throw error when used outside of provider', () => {
    // Suppress console.error for this test as we expect an error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within a ThemeProvider',
    );

    consoleSpy.mockRestore();
  });
});

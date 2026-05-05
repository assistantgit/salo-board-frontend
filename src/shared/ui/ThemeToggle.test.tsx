import * as sharedLib from '@shared/lib';
import type { ThemeContextValue } from '@shared/model';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle Component', () => {
  it('should render SunIcon when theme is light', () => {
    vi.spyOn(sharedLib, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
    } as ThemeContextValue);

    render(<ThemeToggle />);
    expect(screen.getByLabelText(/Switch to dark theme/i)).toBeInTheDocument();
  });

  it('should render MoonIcon when theme is dark', () => {
    vi.spyOn(sharedLib, 'useTheme').mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn(),
      setTheme: vi.fn(),
    } as ThemeContextValue);

    render(<ThemeToggle />);
    expect(screen.getByLabelText(/Switch to light theme/i)).toBeInTheDocument();
  });

  it('should call toggleTheme on click', () => {
    const toggleTheme = vi.fn();
    vi.spyOn(sharedLib, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme,
      setTheme: vi.fn(),
    } as ThemeContextValue);

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(toggleTheme).toHaveBeenCalled();
  });
});

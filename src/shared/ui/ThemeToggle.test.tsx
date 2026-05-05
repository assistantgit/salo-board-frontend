import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from './ThemeToggle';
import * as sharedLib from '@shared/lib';

describe('ThemeToggle Component', () => {
  it('should render SunIcon when theme is light', () => {
    vi.spyOn(sharedLib, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    } as any);

    render(<ThemeToggle />);
    expect(screen.getByLabelText(/Switch to dark theme/i)).toBeInTheDocument();
  });

  it('should render MoonIcon when theme is dark', () => {
    vi.spyOn(sharedLib, 'useTheme').mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn(),
    } as any);

    render(<ThemeToggle />);
    expect(screen.getByLabelText(/Switch to light theme/i)).toBeInTheDocument();
  });

  it('should call toggleTheme on click', () => {
    const toggleTheme = vi.fn();
    vi.spyOn(sharedLib, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme,
    } as any);

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(toggleTheme).toHaveBeenCalled();
  });
});

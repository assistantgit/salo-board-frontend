import { type TournamentDomain, useCurrentTournament } from '@entities/tournament';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TournamentRules } from './TournamentRules';

// Mock the hook
vi.mock('../lib/useCurrentTournament', () => ({
  useCurrentTournament: vi.fn(),
}));

describe('TournamentRules Component', () => {
  it('should render skeleton while loading', () => {
    vi.mocked(useCurrentTournament).mockReturnValue({
      tournament: null,
      isLoading: true,
      error: null,
    });

    render(<TournamentRules />);
    // ContentBlock title should be visible even during loading
    expect(screen.getByText('Правила турніру')).toBeInTheDocument();
  });

  it('should render rules content when data is loaded', () => {
    vi.mocked(useCurrentTournament).mockReturnValue({
      tournament: { rules: 'Line 1\nLine 2' } as unknown as TournamentDomain,
      isLoading: false,
      error: null,
    });

    render(<TournamentRules />);
    expect(screen.getByText('Line 1')).toBeInTheDocument();
    expect(screen.getByText('Line 2')).toBeInTheDocument();
  });

  it('should return null if no rules are present', () => {
    vi.mocked(useCurrentTournament).mockReturnValue({
      tournament: { rules: '' } as unknown as TournamentDomain,
      isLoading: false,
      error: null,
    });

    const { container } = render(<TournamentRules />);
    expect(container.firstChild).toBeNull();
  });
});

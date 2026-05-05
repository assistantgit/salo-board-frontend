import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useCurrentTournament } from '../lib/useCurrentTournament';
import { TournamentRules } from './TournamentRules';

// Mock the hook
vi.mock('../lib/useCurrentTournament', () => ({
  useCurrentTournament: vi.fn(),
}));

describe('TournamentRules Component', () => {
  it('should render skeleton while loading', () => {
    (useCurrentTournament as any).mockReturnValue({
      tournament: null,
      isLoading: true,
    });

    render(<TournamentRules />);
    // ContentBlock title should be visible even during loading
    expect(screen.getByText('Правила турніру')).toBeInTheDocument();
  });

  it('should render rules content when data is loaded', () => {
    (useCurrentTournament as any).mockReturnValue({
      tournament: { rules: 'Line 1\nLine 2' },
      isLoading: false,
    });

    render(<TournamentRules />);
    expect(screen.getByText('Line 1')).toBeInTheDocument();
    expect(screen.getByText('Line 2')).toBeInTheDocument();
  });

  it('should return null if no rules are present', () => {
    (useCurrentTournament as any).mockReturnValue({
      tournament: { rules: '' },
      isLoading: false,
    });

    const { container } = render(<TournamentRules />);
    expect(container.firstChild).toBeNull();
  });
});

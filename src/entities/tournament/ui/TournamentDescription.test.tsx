import { type TournamentDomain, useCurrentTournament } from '@entities/tournament';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TournamentDescription } from './TournamentDescription';

// Mock the hook
vi.mock('../lib/useCurrentTournament', () => ({
  useCurrentTournament: vi.fn(),
}));

describe('TournamentDescription Component', () => {
  it('should render skeleton while loading', () => {
    vi.mocked(useCurrentTournament).mockReturnValue({
      tournament: null,
      isLoading: true,
      error: null,
    });

    render(<TournamentDescription />);
    expect(screen.getByText('Про турнір')).toBeInTheDocument();
  });

  it('should render description when data is loaded', () => {
    vi.mocked(useCurrentTournament).mockReturnValue({
      tournament: { description: 'Test description content' } as unknown as TournamentDomain,
      isLoading: false,
      error: null,
    });

    render(<TournamentDescription />);
    expect(screen.getByText('Test description content')).toBeInTheDocument();
  });

  it('should return null if no description is present', () => {
    vi.mocked(useCurrentTournament).mockReturnValue({
      tournament: { description: '' } as unknown as TournamentDomain,
      isLoading: false,
      error: null,
    });

    const { container } = render(<TournamentDescription />);
    expect(container.firstChild).toBeNull();
  });
});

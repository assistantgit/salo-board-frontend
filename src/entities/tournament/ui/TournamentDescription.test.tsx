import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useCurrentTournament } from '../lib/useCurrentTournament';
import { TournamentDescription } from './TournamentDescription';

// Mock the hook
vi.mock('../lib/useCurrentTournament', () => ({
  useCurrentTournament: vi.fn(),
}));

describe('TournamentDescription Component', () => {
  it('should render skeleton while loading', () => {
    (useCurrentTournament as any).mockReturnValue({
      tournament: null,
      isLoading: true,
    });

    render(<TournamentDescription />);
    expect(screen.getByText('Про турнір')).toBeInTheDocument();
  });

  it('should render description when data is loaded', () => {
    (useCurrentTournament as any).mockReturnValue({
      tournament: { description: 'Test description content' },
      isLoading: false,
    });

    render(<TournamentDescription />);
    expect(screen.getByText('Test description content')).toBeInTheDocument();
  });

  it('should return null if no description is present', () => {
    (useCurrentTournament as any).mockReturnValue({
      tournament: { description: '' },
      isLoading: false,
    });

    const { container } = render(<TournamentDescription />);
    expect(container.firstChild).toBeNull();
  });
});

import { useMyTeamInTournament } from '@entities/team';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { TournamentDetailsButton } from './TournamentDetailsButton';

vi.mock('@entities/team', () => ({
  useMyTeamInTournament: vi.fn(),
}));

describe('TournamentDetailsButton Component', () => {
  it('should render nothing while loading', () => {
    (useMyTeamInTournament as any).mockReturnValue({ data: null, isLoading: true });
    const { container } = render(
      <MemoryRouter>
        <TournamentDetailsButton tournamentId={1} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing if user has no team in tournament', () => {
    (useMyTeamInTournament as any).mockReturnValue({ data: null, isLoading: false });
    const { container } = render(
      <MemoryRouter>
        <TournamentDetailsButton tournamentId={1} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render link if user has a team', () => {
    (useMyTeamInTournament as any).mockReturnValue({ data: { id: 123 }, isLoading: false });
    render(
      <MemoryRouter>
        <TournamentDetailsButton tournamentId={1} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Деталі турніру/i)).toBeInTheDocument();
  });
});

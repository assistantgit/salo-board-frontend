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
    vi.mocked(useMyTeamInTournament).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as ReturnType<typeof useMyTeamInTournament>);
    const { container } = render(
      <MemoryRouter>
        <TournamentDetailsButton tournamentId={1} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing if user has no team in tournament', () => {
    vi.mocked(useMyTeamInTournament).mockReturnValue({
      data: undefined,
      isLoading: false,
    } as unknown as ReturnType<typeof useMyTeamInTournament>);
    const { container } = render(
      <MemoryRouter>
        <TournamentDetailsButton tournamentId={1} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render link if user has a team', () => {
    vi.mocked(useMyTeamInTournament).mockReturnValue({
      data: { id: 123 } as unknown as ReturnType<typeof useMyTeamInTournament>['data'],
      isLoading: false,
    } as unknown as ReturnType<typeof useMyTeamInTournament>);
    render(
      <MemoryRouter>
        <TournamentDetailsButton tournamentId={1} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Деталі турніру/i)).toBeInTheDocument();
  });
});

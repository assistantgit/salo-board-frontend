import { type TeamDomain, useMyTeamInTournament } from '@entities/team';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { JoinTournamentButton } from './JoinTournamentButton';

vi.mock('@entities/team', () => ({
  useMyTeamInTournament: vi.fn(),
}));

vi.mock('./TeamRegistrationModal', () => ({
  TeamRegistrationModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid='registration-modal'>Modal</div> : null,
}));

describe('JoinTournamentButton Component', () => {
  it('should render nothing if status is not RG', () => {
    vi.mocked(useMyTeamInTournament).mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown as ReturnType<typeof useMyTeamInTournament>);
    const { container } = render(<JoinTournamentButton tournamentId={1} status='RN' />);
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing if user already has a team', () => {
    vi.mocked(useMyTeamInTournament).mockReturnValue({
      data: { id: 1 } as unknown as TeamDomain,
      isLoading: false,
    } as unknown as ReturnType<typeof useMyTeamInTournament>);
    const { container } = render(<JoinTournamentButton tournamentId={1} status='RG' />);
    expect(container.firstChild).toBeNull();
  });

  it('should render button if status is RG and user has no team', () => {
    vi.mocked(useMyTeamInTournament).mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown as ReturnType<typeof useMyTeamInTournament>);
    render(<JoinTournamentButton tournamentId={1} status='RG' />);
    expect(screen.getByText(/Зареєструватися/i)).toBeInTheDocument();
  });

  it('should open modal when clicked', () => {
    vi.mocked(useMyTeamInTournament).mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown as ReturnType<typeof useMyTeamInTournament>);
    render(<JoinTournamentButton tournamentId={1} status='RG' />);

    fireEvent.click(screen.getByText(/Зареєструватися/i));
    expect(screen.getByTestId('registration-modal')).toBeInTheDocument();
  });
});

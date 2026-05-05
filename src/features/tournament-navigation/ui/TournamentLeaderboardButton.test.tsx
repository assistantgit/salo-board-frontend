import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { TournamentLeaderboardButton } from './TournamentLeaderboardButton';

describe('TournamentLeaderboardButton Component', () => {
  it('should render nothing if status is RG', () => {
    const { container } = render(
      <MemoryRouter>
        <TournamentLeaderboardButton tournamentId={1} status='RG' />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render link for other statuses', () => {
    render(
      <MemoryRouter>
        <TournamentLeaderboardButton tournamentId={1} status='RN' />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Лідерборд/i)).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <MemoryRouter>
        <TournamentLeaderboardButton tournamentId={1} status='FN' className='custom-leaderboard' />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link')).toHaveClass('custom-leaderboard');
  });
});

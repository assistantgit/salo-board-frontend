import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LeaderboardRow } from './LeaderboardRow';

vi.mock('@entities/team', () => ({
  TeamAvatar: ({ teamName }: { teamName: string }) => (
    <div data-testid='team-avatar'>{teamName}</div>
  ),
}));

describe('LeaderboardRow Component', () => {
  const mockProps = {
    rank: 1,
    teamName: 'Dream Team',
    lastRoundScore: 15,
    totalScore: 45,
    onToggle: vi.fn(),
  };

  it('should render basic info correctly', () => {
    render(<LeaderboardRow {...mockProps} />);

    expect(screen.getAllByText('Dream Team')).toHaveLength(2); // Avatar and text
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('15 балів')).toBeInTheDocument();
    expect(screen.getByText('45 балів')).toBeInTheDocument();
  });

  it('should show "Ви" badge for current user team', () => {
    render(<LeaderboardRow {...mockProps} isCurrentUserTeam={true} />);
    expect(screen.getByText('Ви')).toBeInTheDocument();
  });

  it('should call onToggle when clicked', () => {
    render(<LeaderboardRow {...mockProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockProps.onToggle).toHaveBeenCalled();
  });

  it('should render children when expanded', () => {
    render(
      <LeaderboardRow {...mockProps} isExpanded={true}>
        <div data-testid='expanded-content'>Details</div>
      </LeaderboardRow>,
    );
    expect(screen.getByTestId('expanded-content')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LeaderboardPodium } from './LeaderboardPodium';

vi.mock('@entities/team', () => ({
  TeamAvatar: ({ teamName }: { teamName: string }) => (
    <div data-testid='team-avatar'>{teamName}</div>
  ),
}));

describe('LeaderboardPodium Component', () => {
  const mockTeams = [
    { teamId: 1, teamName: 'Winners', totalScore: 100, rank: 1 },
    { teamId: 2, teamName: 'Seconds', totalScore: 90, rank: 2 },
    { teamId: 3, teamName: 'Thirds', totalScore: 80, rank: 3 },
  ];

  it('should render top 3 teams correctly', () => {
    render(<LeaderboardPodium topTeams={mockTeams as any} />);

    expect(screen.getAllByText('Winners')).toHaveLength(2); // Avatar and title
    expect(screen.getAllByText('Seconds')).toHaveLength(2);
    expect(screen.getAllByText('Thirds')).toHaveLength(2);
    expect(screen.getByText('100 балів')).toBeInTheDocument();
    expect(screen.getAllByTestId('team-avatar')).toHaveLength(3);
  });

  it('should render nothing if less than 3 teams provided', () => {
    const { container } = render(<LeaderboardPodium topTeams={mockTeams.slice(0, 2) as any} />);
    expect(container.firstChild).toBeNull();
  });

  it('should have correct rank roman numerals', () => {
    render(<LeaderboardPodium topTeams={mockTeams as any} />);
    expect(screen.getByText('I')).toBeInTheDocument();
    expect(screen.getByText('II')).toBeInTheDocument();
    expect(screen.getByText('III')).toBeInTheDocument();
  });
});

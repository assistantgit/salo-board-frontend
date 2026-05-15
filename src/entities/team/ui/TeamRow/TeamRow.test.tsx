import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { TeamDomain } from '../../model/team.types';
import { TeamRow } from './TeamRow';

describe('TeamRow Component', () => {
  const mockTeam: TeamDomain = {
    id: 1,
    name: 'Team Rocket',
    initials: 'TR',
    status: 'RG',
    tournamentId: 1,
  };

  it('should render team name and initials', () => {
    render(<TeamRow team={mockTeam} />);
    expect(screen.getByText('Team Rocket')).toBeInTheDocument();
    expect(screen.getByText('TR')).toBeInTheDocument();
  });

  it('should apply custom color if provided', () => {
    const { container } = render(<TeamRow team={mockTeam} color='#00ff00' />);
    // The initials div is the first child of the main container
    const avatar = container.firstChild?.firstChild as HTMLElement;
    expect(avatar).toHaveStyle({ '--avatar-bg': '#00ff00' });
  });
});

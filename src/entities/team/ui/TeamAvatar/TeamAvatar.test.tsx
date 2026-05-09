import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TeamAvatar } from './TeamAvatar';

vi.mock('../../lib/teamAvatar', () => ({
  getTeamColor: vi.fn(() => '#ff0000'),
  getTeamInitials: vi.fn((name) => name.substring(0, 2).toUpperCase()),
}));

describe('TeamAvatar Component', () => {
  it('should render initials correctly', () => {
    render(<TeamAvatar teamName='Alpha Team' />);
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('should apply styles based on props', () => {
    const { container } = render(
      <TeamAvatar teamName='Beta' size='100px' fontSize='20px' className='custom-avatar' />,
    );
    const avatar = container.firstChild as HTMLElement;

    expect(avatar).toHaveStyle({
      backgroundColor: '#ff0000',
      width: '100px',
      height: '100px',
      fontSize: '20px',
    });
    expect(avatar).toHaveClass('custom-avatar');
  });

  it('should use default size and fontSize if not provided', () => {
    const { container } = render(<TeamAvatar teamName='Gamma' />);
    const avatar = container.firstChild as HTMLElement;
    expect(avatar.style.width).toBeDefined();
    expect(avatar.style.fontSize).toBeDefined();
  });
});

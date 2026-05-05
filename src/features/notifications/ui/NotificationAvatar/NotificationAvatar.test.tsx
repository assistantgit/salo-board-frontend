import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NotificationAvatar } from './NotificationAvatar';

describe('NotificationAvatar Component', () => {
  it('should render image if avatarUrl is provided', () => {
    render(<NotificationAvatar avatarUrl='http://example.com/img.png' />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'http://example.com/img.png');
  });

  it('should render initials if provided and no type', () => {
    render(<NotificationAvatar initials='JD' />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should render icon based on type', () => {
    const { container } = render(<NotificationAvatar type='TI' />);
    // Check if the container has the team color class
    expect(container.firstChild).toHaveClass(/typeTeam/);
  });

  it('should render default icon if no props provided', () => {
    const { container } = render(<NotificationAvatar />);
    expect(container.firstChild).toHaveClass(/typeDefault/);
  });
});

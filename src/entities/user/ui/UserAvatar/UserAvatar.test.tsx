import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { UserAvatar } from './UserAvatar';

vi.mock('@entities/user/lib', () => ({
  getInitials: vi.fn((name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase(),
  ),
}));

describe('UserAvatar Entity Component', () => {
  it('should render initials and aria-label', () => {
    render(<UserAvatar fullName='Bob Martin' />);
    expect(screen.getByText('BM')).toBeInTheDocument();
    expect(screen.getByLabelText('Bob Martin')).toBeInTheDocument();
  });

  it('should apply variant class', () => {
    const { container } = render(<UserAvatar fullName='Bob Martin' variant='clean' />);
    expect(container.firstChild).toHaveClass(/clean/);
  });

  it('should set CSS variables for size', () => {
    const { container } = render(<UserAvatar fullName='Bob Martin' size='lg' />);
    const avatar = container.firstChild as HTMLElement;
    expect(avatar.style.getPropertyValue('--avatar-default-size')).toBeDefined();
  });
});

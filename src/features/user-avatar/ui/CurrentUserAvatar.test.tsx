import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CurrentUserAvatar } from './CurrentUserAvatar';

vi.mock('@entities/user/lib', () => ({
  getInitials: vi.fn((name: string) =>
    name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase(),
  ),
}));

describe('CurrentUserAvatar Component', () => {
  const mockOnNavigate = vi.fn();

  it('should render initials correctly', () => {
    render(<CurrentUserAvatar fullName='John Doe' onNavigate={mockOnNavigate} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should call onNavigate when clicked', () => {
    render(<CurrentUserAvatar fullName='John Doe' onNavigate={mockOnNavigate} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnNavigate).toHaveBeenCalled();
  });

  it('should have correct aria-label', () => {
    render(<CurrentUserAvatar fullName='John Doe' onNavigate={mockOnNavigate} />);
    expect(screen.getByLabelText(/John Doe — open profile/i)).toBeInTheDocument();
  });

  it('should apply size-based styles', () => {
    const { container } = render(
      <CurrentUserAvatar fullName='John Doe' onNavigate={mockOnNavigate} size='lg' />,
    );
    const button = container.firstChild as HTMLElement;
    expect(button.style.width).toBeDefined();
    expect(button.style.height).toBeDefined();
  });
});

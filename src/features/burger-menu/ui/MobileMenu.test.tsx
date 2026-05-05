import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MobileMenu } from './MobileMenu';

vi.mock('@features/user-avatar', () => ({
  CurrentUserAvatar: ({ fullName, onNavigate }: { fullName: string; onNavigate: () => void }) => (
    <div
      onClick={onNavigate}
      onKeyDown={(e) => e.key === 'Enter' && onNavigate()}
      data-testid='avatar'
      role='button'
      tabIndex={0}
    >
      {fullName}
    </div>
  ),
}));

describe('MobileMenu Component', () => {
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
    userFullName: 'John Doe',
    onAvatarClick: vi.fn(),
    children: <a href='/test'>Link</a>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
  });

  it('should render when open', () => {
    render(<MobileMenu {...mockProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    // In MobileMenu, John Doe appears as both avatar text and name button
    expect(screen.getAllByText('John Doe')).toHaveLength(2);
  });

  it('should call onClose when backdrop is clicked', () => {
    render(<MobileMenu {...mockProps} />);
    const backdrop = screen.getAllByLabelText(/Закрити меню/i)[0];
    fireEvent.click(backdrop);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('should call onAvatarClick when name or avatar is clicked', () => {
    render(<MobileMenu {...mockProps} />);
    // Get all buttons with name John Doe (avatar div and name button)
    const nameButtons = screen.getAllByRole('button', { name: 'John Doe' });
    fireEvent.click(nameButtons[0]);
    expect(mockProps.onAvatarClick).toHaveBeenCalled();
  });

  it('should close when a link inside is clicked', () => {
    render(<MobileMenu {...mockProps} />);
    fireEvent.click(screen.getByText('Link'));
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('should disable body scroll when open', () => {
    render(<MobileMenu {...mockProps} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should restore body scroll when unmounted', () => {
    const { unmount } = render(<MobileMenu {...mockProps} />);
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});

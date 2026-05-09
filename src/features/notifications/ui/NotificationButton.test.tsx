import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useNotificationStore } from '../model/store';
import { NotificationButton } from './NotificationButton';

vi.mock('../model/store', () => ({
  useNotificationStore: vi.fn(),
}));

vi.mock('./NotificationDropdown/NotificationDropdown', () => ({
  NotificationDropdown: ({ onClose }: { onClose: () => void }) => (
    <div data-testid='dropdown'>
      <button type='button' onClick={onClose}>
        Close
      </button>
    </div>
  ),
}));

describe('NotificationButton Component', () => {
  const fetchNotifications = vi.fn();
  const getUnreadCount = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNotificationStore as any).mockReturnValue({
      fetchNotifications,
      getUnreadCount,
    });
  });

  it('should fetch notifications on mount', () => {
    getUnreadCount.mockReturnValue(0);
    render(<NotificationButton />);
    expect(fetchNotifications).toHaveBeenCalled();
  });

  it('should display badge when there are unread notifications', () => {
    getUnreadCount.mockReturnValue(5);
    render(<NotificationButton />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should toggle dropdown when clicked', () => {
    getUnreadCount.mockReturnValue(0);
    render(<NotificationButton />);

    const button = screen.getByLabelText(/Notifications/i);
    fireEvent.click(button);

    expect(screen.getByTestId('dropdown')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  });

  it('should close dropdown when onClose is called', () => {
    getUnreadCount.mockReturnValue(0);
    render(<NotificationButton />);

    fireEvent.click(screen.getByLabelText(/Notifications/i));
    fireEvent.click(screen.getByText('Close'));

    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  });
});

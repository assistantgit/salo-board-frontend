import type { NotificationDto } from '@entities/notification';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, type Mock, vi } from 'vitest';
import { useNotificationStore } from '../../model/store';
import { NotificationDropdownItem } from './NotificationDropdownItem';

vi.mock('../../model/store', () => ({
  useNotificationStore: vi.fn(),
}));

describe('NotificationDropdownItem', () => {
  const mockPerformAction = vi.fn();

  beforeEach(() => {
    mockPerformAction.mockClear();
    (useNotificationStore as unknown as Mock).mockReturnValue({
      performAction: mockPerformAction,
    });
  });

  const mockNotification: NotificationDto = {
    id: 1,
    title: 'Test Notification',
    message: 'Test Message',
    status: 'UR',
    type: 'JI',
    createdAt: new Date().toISOString(),
    actionType: 'YN',
    actionUrl: '',
    howLongActive: '',
    user: 0,
  };

  it('should render notification details', () => {
    render(<NotificationDropdownItem notification={mockNotification} />);

    expect(screen.getByText('Test Notification')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByText('Прийняти')).toBeInTheDocument();
    expect(screen.getByText('Відхилити')).toBeInTheDocument();
  });

  it('should call performAction when clicking accept', () => {
    render(<NotificationDropdownItem notification={mockNotification} />);

    fireEvent.click(screen.getByText('Прийняти'));
    expect(mockPerformAction).toHaveBeenCalledWith(1, 'accept');
  });

  it('should call performAction when clicking reject', () => {
    render(<NotificationDropdownItem notification={mockNotification} />);

    fireEvent.click(screen.getByText('Відхилити'));
    expect(mockPerformAction).toHaveBeenCalledWith(1, 'reject');
  });

  it('should call performAction when clicking the item if unread', () => {
    render(<NotificationDropdownItem notification={mockNotification} />);

    fireEvent.click(screen.getByTestId('notification-item'));
    expect(mockPerformAction).toHaveBeenCalledWith(1, 'read');
  });

  it('should not call performAction read if already read', () => {
    render(<NotificationDropdownItem notification={{ ...mockNotification, status: 'RD' }} />);

    fireEvent.click(screen.getByTestId('notification-item'));
    expect(mockPerformAction).not.toHaveBeenCalledWith(1, 'read');
  });

  it('should handle actionUrl type', () => {
    const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(
      <NotificationDropdownItem
        notification={{
          ...mockNotification,
          actionType: undefined as any,
          actionUrl: 'http://test.com',
        }}
      />,
    );

    fireEvent.click(screen.getByText('Перейти'));
    expect(windowSpy).toHaveBeenCalledWith('http://test.com', '_blank');
    windowSpy.mockRestore();
  });
});

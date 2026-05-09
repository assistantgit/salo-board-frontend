import type { NotificationDto } from '@entities/notification';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useNotificationStore } from '../../model/store';
import { NotificationItem } from './NotificationItem';

vi.mock('../../model/store', () => ({
  useNotificationStore: vi.fn(),
}));

describe('NotificationItem', () => {
  const mockPerformAction = vi.fn();

  beforeEach(() => {
    mockPerformAction.mockClear();
    vi.mocked(useNotificationStore).mockReturnValue({
      performAction: mockPerformAction,
    } as unknown as ReturnType<typeof useNotificationStore>);
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

  it('should render notification details with invitation badge', () => {
    render(<NotificationItem notification={mockNotification} />);

    expect(screen.getByText('Test Notification')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByText('Запрошення')).toBeInTheDocument(); // NotificationBadge label for 'invitation'
  });

  it('should render tournament badge for TS type', () => {
    render(<NotificationItem notification={{ ...mockNotification, type: 'TS' }} />);
    expect(screen.getByText('Турнір')).toBeInTheDocument(); // NotificationBadge label for 'tournament'
  });

  it('should call performAction when clicking accept', () => {
    render(<NotificationItem notification={mockNotification} />);

    fireEvent.click(screen.getByText('Прийняти'));
    expect(mockPerformAction).toHaveBeenCalledWith(1, 'accept');
  });

  it('should call performAction when clicking reject', () => {
    render(<NotificationItem notification={mockNotification} />);

    fireEvent.click(screen.getByText('Відхилити'));
    expect(mockPerformAction).toHaveBeenCalledWith(1, 'reject');
  });

  it('should call performAction read if clicked while unread', () => {
    render(<NotificationItem notification={mockNotification} />);

    fireEvent.click(screen.getByTestId('notification-item'));
    expect(mockPerformAction).toHaveBeenCalledWith(1, 'read');
  });

  it('should handle actionUrl', () => {
    const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => null as unknown as Window);
    render(
      <NotificationItem
        notification={{
          ...mockNotification,
          actionType: 'YN',
          actionUrl: 'http://test.com',
        }}
      />,
    );

    fireEvent.click(screen.getByText('Перейти'));
    expect(windowSpy).toHaveBeenCalledWith('http://test.com', '_blank');
    windowSpy.mockRestore();
  });
});

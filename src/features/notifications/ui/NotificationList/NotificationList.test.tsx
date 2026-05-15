import type { NotificationDto } from '@entities/notification';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useNotificationStore } from '../../model/store';
import { NotificationList } from './NotificationList';

vi.mock('../../model/store', () => ({
  useNotificationStore: vi.fn(),
}));

vi.mock('../NotificationItem/NotificationItem', () => ({
  NotificationItem: ({ notification }: { notification: NotificationDto }) => (
    <div data-testid='notification-item'>{notification.title}</div>
  ),
}));

vi.mock('../NotificationDropdownItem/NotificationDropdownItem', () => ({
  NotificationDropdownItem: ({ notification }: { notification: NotificationDto }) => (
    <div data-testid='dropdown-item'>{notification.title}</div>
  ),
}));

describe('NotificationList Component', () => {
  const fetchNotifications = vi.fn();
  const mockState = {
    notifications: [
      { id: 1, title: 'Note 1', type: 'TI' },
      { id: 2, title: 'Note 2', type: 'TS' },
    ] as unknown as NotificationDto[],
    isLoading: false,
    filter: 'all',
    fetchNotifications,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNotificationStore).mockReturnValue(
      mockState as unknown as ReturnType<typeof useNotificationStore>,
    );
  });

  it('should call fetchNotifications on mount', () => {
    render(<NotificationList />);
    expect(fetchNotifications).toHaveBeenCalled();
  });

  it('should render loading state', () => {
    vi.mocked(useNotificationStore).mockReturnValue({
      ...mockState,
      notifications: [],
      isLoading: true,
    } as unknown as ReturnType<typeof useNotificationStore>);
    render(<NotificationList />);
    expect(screen.getByText(/Завантаження/i)).toBeInTheDocument();
  });

  it('should render empty state if no notifications', () => {
    vi.mocked(useNotificationStore).mockReturnValue({
      ...mockState,
      notifications: [],
    } as unknown as ReturnType<typeof useNotificationStore>);
    render(<NotificationList />);
    expect(screen.getByText(/Сповіщень немає/i)).toBeInTheDocument();
  });

  it('should render items for dropdown variant by default', () => {
    render(<NotificationList />);
    expect(screen.getAllByTestId('dropdown-item')).toHaveLength(2);
  });

  it('should render items for feed variant', () => {
    render(<NotificationList variant='feed' />);
    expect(screen.getAllByTestId('notification-item')).toHaveLength(2);
  });

  it('should filter notifications correctly', () => {
    vi.mocked(useNotificationStore).mockReturnValue({
      ...mockState,
      filter: 'invitations',
    } as unknown as ReturnType<typeof useNotificationStore>);
    render(<NotificationList variant='feed' />);
    // Only Note 1 (TI) should be rendered
    expect(screen.getAllByTestId('notification-item')).toHaveLength(1);
    expect(screen.getByText('Note 1')).toBeInTheDocument();
  });
});

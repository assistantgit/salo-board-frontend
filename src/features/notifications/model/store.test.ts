import type { NotificationDto } from '@entities/notification';
import { notificationApi } from '@entities/notification';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useNotificationStore } from './store';

vi.mock('@entities/notification', () => ({
  notificationApi: {
    getNotifications: vi.fn(),
    performAction: vi.fn(),
    markAllAsRead: vi.fn(),
  },
}));

describe('useNotificationStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useNotificationStore.setState({
      notifications: [],
      isLoading: false,
      error: null,
      filter: 'all',
    });
  });

  it('should fetch notifications and update state', async () => {
    const mockNotifications = [
      { id: 1, status: 'UR', title: 'N1', type: 'JI', createdAt: '2024-01-01' },
      { id: 2, status: 'RD', title: 'N2', type: 'TS', createdAt: '2024-01-02' },
    ] as unknown as NotificationDto[];
    vi.mocked(notificationApi.getNotifications).mockResolvedValue(mockNotifications);

    await useNotificationStore.getState().fetchNotifications();

    const expected = [mockNotifications[1], mockNotifications[0]];
    expect(useNotificationStore.getState().notifications).toEqual(expected);
    expect(useNotificationStore.getState().isLoading).toBe(false);
  });

  it('should calculate unread count correctly', () => {
    useNotificationStore.setState({
      notifications: [
        { id: 1, status: 'UR' },
        { id: 2, status: 'UR' },
        { id: 3, status: 'RD' },
      ] as unknown as NotificationDto[],
    });

    expect(useNotificationStore.getState().getUnreadCount()).toBe(2);
  });

  it('should mark notification as read', async () => {
    useNotificationStore.setState({
      notifications: [{ id: 1, status: 'UR' }] as unknown as NotificationDto[],
    });
    vi.mocked(notificationApi.performAction).mockResolvedValue({} as unknown as undefined);

    await useNotificationStore.getState().markAsRead(1);

    expect(notificationApi.performAction).toHaveBeenCalledWith(1, 'read');
    expect(useNotificationStore.getState().notifications[0].status).toBe('RD');
  });

  it('should filter notifications', () => {
    const store = useNotificationStore.getState();
    store.setFilter('invitations');
    expect(useNotificationStore.getState().filter).toBe('invitations');
  });
});

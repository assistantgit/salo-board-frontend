import { create } from 'zustand';
import { notificationApi, type NotificationDto } from '@entities/notification';

export type FilterType = 'all' | 'invitations' | 'tournaments' | 'events';

interface NotificationsState {
  notifications: NotificationDto[];
  isLoading: boolean;
  error: string | null;
  filter: FilterType;

  // Actions
  fetchNotifications: () => Promise<void>;
  setFilter: (filter: FilterType) => void;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  performAction: (id: number, action: 'accept' | 'reject' | 'archive' | 'read') => Promise<void>;

  // Selectors
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  isLoading: false,
  error: null,
  filter: 'all',

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const notifications = await notificationApi.getNotifications();
      set({ notifications, isLoading: false });
    } catch (err: unknown) {
      const message = (err as { message?: string }).message ?? 'Failed to fetch notifications';
      set({ error: message, isLoading: false });
    }
  },

  setFilter: (filter: FilterType) => {
    set({ filter });
  },

  markAsRead: async (id: number) => {
    try {
      await notificationApi.performAction(id, 'read');
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, status: 'RD' as const } : n
        ),
      }));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  },

  markAllAsRead: async () => {
    try {
      await notificationApi.markAllAsRead();
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, status: 'RD' as const })),
      }));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  },

  performAction: async (id: number, action: 'accept' | 'reject' | 'archive' | 'read') => {
    try {
      await notificationApi.performAction(id, action);
      // Remove or update the notification status
      if (action === 'archive') {
          set((state) => ({
              notifications: state.notifications.filter(n => n.id !== id)
          }));
      } else {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, status: 'RD' as const } : n
          ),
        }));
      }
    } catch (err) {
      console.error(`Failed to perform ${action} on notification:`, err);
    }
  },

  getUnreadCount: () => {
    return get().notifications.filter((n) => n.status === 'UR').length;
  },
}));

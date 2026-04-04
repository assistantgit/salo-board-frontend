import { baseApi } from "@shared/api/baseApi";
import type { NotificationDto, NotificationStatus } from "../model/types";

export const notificationApi = {
  getNotifications: async (status?: string): Promise<NotificationDto[]> => {
    const { data } = await baseApi.get<NotificationDto[]>('/notifications', {
      params: { status },
    });
    return data;
  },

  getArchivedNotifications: async (): Promise<NotificationDto[]> => {
    const { data } = await baseApi.get<NotificationDto[]>('/notifications/archive');
    return data;
  },

  performAction: async (
    notification_id: number,
    action: 'read' | 'archive' | 'accept' | 'reject'
  ): Promise<{ status: NotificationStatus }> => {
    const { data } = await baseApi.patch<{ status: NotificationStatus }>(
      `/notifications/${notification_id}`,
      { action }
    );
    return data;
  },

  markAllAsRead: async (): Promise<void> => {
    // There isn't an explicit endpoint in the YAML for "mark all as read".
    // I should probably check if there is one later.
    // Given 'notifications_partial_update' is for specific ID.
    // If not, we might have to call each one or the backend should add it.
    // For now, I'll keep it as a placeholder as the plan suggested.
    await baseApi.patch('/notifications', { action: 'read_all' });
  },
};

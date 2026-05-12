/**
 * Centralized color configuration for notification types.
 */
export const NOTIFICATION_TYPE_COLORS = {
  reminders: '#f97316', // Orange
  roster: '#be3638', // Red
  invitations: '#2c23d5', // Blue
  events: '#f59e0b', // Amber
};

/**
 * Configuration for Notification Filter Tabs.
 */
export const NOTIFICATION_FILTER_TABS = [
  { id: 'all', label: 'Всі' },
  { id: 'reminders', label: 'Нагадування', dotColor: NOTIFICATION_TYPE_COLORS.reminders },
  { id: 'roster', label: 'Зміни у складі', dotColor: NOTIFICATION_TYPE_COLORS.roster },
  { id: 'invitations', label: 'Запрошення', dotColor: NOTIFICATION_TYPE_COLORS.invitations },
  { id: 'events', label: 'Події', dotColor: NOTIFICATION_TYPE_COLORS.events },
];

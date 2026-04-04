export type NotificationType = 'JI' | 'TI' | 'KT' | 'TS' | 'SD' | 'EF';
export type ActionType = 'YN' | 'NN' | 'MG';
export type NotificationStatus = 'UR' | 'RD' | 'AR';

export interface NotificationDto {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  actionType: ActionType;
  actionUrl: string;
  status: NotificationStatus;
  howLongActive: string;
  createdAt: string;
  user: number;
}

import React from 'react';
import styles from './NotificationAvatar.module.css';
import type { NotificationType } from '@entities/notification';
import { PeopleIcon, TimerIcon, CalendarIcon, PersonIcon } from '@shared/ui/icons';

interface NotificationAvatarProps {
  type?: NotificationType;
  /** @deprecated Use type instead */
  initials?: string;
  /** @deprecated Use type instead */
  avatarUrl?: string;
}

const getIconConfig = (
  type?: NotificationType
): { Icon: React.FC<{ className?: string }>; colorClass: string } => {
  switch (type) {
    case 'JI': // Jury Invitation
      return { Icon: PersonIcon, colorClass: styles.typeJury };
    case 'TI': // Team Invitation
      return { Icon: PeopleIcon, colorClass: styles.typeTeam };
    case 'TS': // Tournament Started
    case 'SD': // Submission Deadline
    case 'EF': // Event/Feature
      return { Icon: TimerIcon, colorClass: styles.typeTournament };
    case 'KT': // Key Tournament
      return { Icon: CalendarIcon, colorClass: styles.typeEvent };
    default:
      return { Icon: PersonIcon, colorClass: styles.typeDefault };
  }
};

export const NotificationAvatar: React.FC<NotificationAvatarProps> = ({ type, avatarUrl, initials }) => {
  if (avatarUrl) {
    return (
      <div className={`${styles.avatar} ${styles.typeDefault}`}>
        <img src={avatarUrl} alt="User avatar" className={styles.image} />
      </div>
    );
  }

  if (initials && !type) {
    return (
      <div className={`${styles.avatar} ${styles.typeDefault}`}>
        <span className={styles.initials}>{initials}</span>
      </div>
    );
  }

  const { Icon, colorClass } = getIconConfig(type);

  return (
    <div className={`${styles.avatar} ${colorClass}`}>
      <Icon className={styles.icon} />
    </div>
  );
};

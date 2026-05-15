import type { AvatarSize } from '@entities/user/config';
import { AVATAR_FONT_SIZE_MAP, AVATAR_SIZE_MAP } from '@entities/user/config';
import { getInitials } from '@entities/user/lib';
import type React from 'react';
import styles from './CurrentUserAvatar.module.css';

export interface CurrentUserAvatarProps {
  fullName: string;
  size?: AvatarSize;
  onNavigate: () => void;
  className?: string;
}

export const CurrentUserAvatar: React.FC<CurrentUserAvatarProps> = ({
  fullName,
  size = 'md',
  onNavigate,
  className = '',
}) => {
  const initials = getInitials(fullName);
  const diameter = AVATAR_SIZE_MAP[size];
  const fontSize = AVATAR_FONT_SIZE_MAP[size];

  return (
    <button
      type='button'
      className={`${styles.avatar} ${className}`}
      style={{ width: diameter, height: diameter, fontSize }}
      onClick={onNavigate}
      aria-label={`${fullName} — open profile`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNavigate();
        }
      }}
    >
      <span aria-hidden='true'>{initials}</span>
    </button>
  );
};

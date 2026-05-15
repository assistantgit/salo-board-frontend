import type { AvatarSize } from '@entities/user/config';
import { AVATAR_FONT_SIZE_MAP, AVATAR_SIZE_MAP } from '@entities/user/config';
import { getInitials } from '@entities/user/lib';
import type React from 'react';
import styles from './UserAvatar.module.css';

export interface UserAvatarProps {
  fullName: string;
  size?: AvatarSize;
  variant?: 'circles' | 'clean';
  className?: string;
}

/**
 * UserAvatar component displays user initials.
 *
 * Variants:
 * - 'circles': Design with multiple ring shadows and glow.
 * - 'clean': Static design inspired by CurrentUserAvatar but without interaction.
 */
export const UserAvatar: React.FC<UserAvatarProps> = ({
  fullName,
  size = 'md',
  variant = 'circles',
  className = '',
}) => {
  const initials = getInitials(fullName);
  const diameter = AVATAR_SIZE_MAP[size];

  const baseFontSize = AVATAR_FONT_SIZE_MAP[size];
  const fontSize = variant === 'clean' ? `calc(${baseFontSize} * 0.85)` : baseFontSize;

  const variantClass = variant === 'clean' ? styles['avatar--clean'] : styles['avatar--circles'];

  return (
    <div
      className={`${styles.avatar} ${variantClass} ${className}`}
      style={
        {
          '--avatar-default-size': diameter,
          '--avatar-default-font-size': fontSize,
        } as React.CSSProperties
      }
      aria-label={fullName}
      role='img'
    >
      <span aria-hidden='true'>{initials}</span>
    </div>
  );
};

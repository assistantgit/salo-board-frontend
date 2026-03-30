import React from 'react';
import styles from './UserAvatar.module.css';
import { getInitials } from '@entities/user/lib';
import type { AvatarSize } from '@entities/user/config';
import { AVATAR_FONT_SIZE_MAP, AVATAR_SIZE_MAP } from '@entities/user/config';

export interface UserAvatarProps {
    fullName: string;
    size?: AvatarSize;
    className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
    fullName,
    size = 'md',
    className = '',
}) => {
    const initials = getInitials(fullName);
    const diameter = AVATAR_SIZE_MAP[size];
    const fontSize = AVATAR_FONT_SIZE_MAP[size];

    return (
        <div
            className={`${styles.avatar} ${className}`}
            style={{ width: diameter, height: diameter, fontSize }}
            aria-label={fullName}
        >
            <span aria-hidden="true">{initials}</span>
        </div>
    );
};
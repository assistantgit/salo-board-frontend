import React from 'react';
import styles from './NotificationButton.module.css';
import { BellIcon, DefaultButton } from '@shared/ui';

interface NotificationButtonProps {
    hasUnread?: boolean;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({ hasUnread = true }) => {
    const handleClick = () => {
        console.log('Bell button clicked');
    };

    return (
        <DefaultButton className={styles.bellButton} onClick={handleClick} aria-label="Notifications">
            <BellIcon size="lg" className={styles.icon} />
            {hasUnread && <div className={styles.badge} />}
        </DefaultButton>
    );
};


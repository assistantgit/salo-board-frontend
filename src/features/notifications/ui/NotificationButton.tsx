import React from 'react';
import styles from './NotificationButton.module.css';
import { BellIcon, DefaultButton } from '@shared/ui';

export const NotificationButton: React.FC = () => {
    const handleClick = () => {
        console.log('Bell button clicked');
    };

    return (
        <DefaultButton className={styles.bellButton} onClick={handleClick} aria-label="Notifications">
            <BellIcon className={styles.icon} />
        </DefaultButton>
    );
};

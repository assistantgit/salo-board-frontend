import React from 'react';
import { Logo } from '@shared/ui';
import styles from './Header.module.css';

export const GuestHeader: React.FC = () => {
    return (
        <div className={styles.logoSection}>
            <Logo />
        </div>
    );
};
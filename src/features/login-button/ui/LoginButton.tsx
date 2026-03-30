import React from 'react';
import { DefaultButton, UserIcon } from '@shared/ui';
import styles from './LoginButton.module.css';

interface LoginButtonProps {
    className?: string;
    onClick?: () => void;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ className = '', onClick }) => {
    return (
        <DefaultButton
            className={`${styles.loginButton} ${className}`}
            onClick={onClick}
            aria-label="Увійти в акаунт"
        >
            <UserIcon size="2xl" className={styles.icon} />
        </DefaultButton>
    );
};
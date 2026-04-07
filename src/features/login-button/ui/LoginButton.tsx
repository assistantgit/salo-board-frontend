import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultButton, UserIcon } from '@shared/ui';
import styles from './LoginButton.module.css';

interface LoginButtonProps {
    className?: string;
}

/**
 * LoginButton Feature.
 * Encapsulates the logic for navigating to the login page.
 */
export const LoginButton: React.FC<LoginButtonProps> = ({ className = '' }) => {
    const navigate = useNavigate();
    
    const handleLogin = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    return (
        <DefaultButton
            className={`${styles.loginButton} ${className}`}
            onClick={handleLogin}
            aria-label="Увійти в акаунт"
        >
            <UserIcon size="2xl" className={styles.icon} />
        </DefaultButton>
    );
};
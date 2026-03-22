import React from 'react';
import { LogoSvg } from '@shared/assets';
import styles from './Logo.module.css';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
    return (
        <div className={`${styles.logoWrapper} ${className}`}>
            <img
                src={LogoSvg}
                alt="Salo Board Logo"
                className={styles.image}
            />
        </div>
    );
};

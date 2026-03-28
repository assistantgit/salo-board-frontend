import React from 'react';
import { BurgerIcon, DefaultButton } from '@shared/ui';
import styles from './BurgerMenu.module.css';

interface BurgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
    className?: string;
}

export const BurgerButton: React.FC<BurgerButtonProps> = ({ isOpen, onClick, className = '' }) => {
    return (
        <DefaultButton
            className={`${styles.burgerBtn} ${className}`}
            onClick={onClick}
            aria-label="Відкрити меню"
            aria-expanded={isOpen}
        >
            <BurgerIcon size="lg" />
        </DefaultButton>
    );
};

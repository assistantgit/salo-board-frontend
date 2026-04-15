import React from 'react';
import { DefaultButton } from '@shared/ui/buttons';
import styles from './ViewRulesButton.module.css';

interface ViewRulesButtonProps {
    className?: string;
}

export const ViewRulesButton: React.FC<ViewRulesButtonProps> = ({ className }) => {
    const handleViewRules = () => {
        const rulesElement = document.getElementById('tournament-rules');
        if (rulesElement) {
            rulesElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <DefaultButton className={`${styles.rulesButton} ${className || ''}`} onClick={handleViewRules}>
            Переглянути правила
        </DefaultButton>
    );
};

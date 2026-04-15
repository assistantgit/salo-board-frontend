import React from 'react';
import { DefaultButton } from '@shared/ui/buttons';

import styles from './JoinTournamentButton.module.css';

interface JoinTournamentButtonProps {
    tournamentId: number;
    className?: string;
}

export const JoinTournamentButton: React.FC<JoinTournamentButtonProps> = ({ tournamentId, className }) => {
    const handleJoin = () => {
        const rulesElement = document.getElementById('tournament-rules');
        if (rulesElement) {
            rulesElement.scrollIntoView({ behavior: 'smooth' });
        }
        console.log(`Joining tournament ${tournamentId}`);
    };

    return (
        <DefaultButton className={`${styles.joinButton} ${className || ''}`} onClick={handleJoin}>
            Зареєструватися
        </DefaultButton>
    );
};

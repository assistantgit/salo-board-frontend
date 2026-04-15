import React from 'react';
import { DefaultButton } from '@shared/ui/buttons';
import { useCurrentTournament } from '@entities/tournament';
import styles from './JoinTournamentButton.module.css';

interface JoinTournamentButtonProps {
    className?: string;
}

export const JoinTournamentButton: React.FC<JoinTournamentButtonProps> = ({ className }) => {
    const { tournament } = useCurrentTournament();

    const handleJoin = () => {
        if (!tournament) return;
        console.log(`Joining tournament ${tournament.id}`);
        // Logic for joining will be added here
    };

    return (
        <DefaultButton className={`${styles.joinButton} ${className || ''}`} onClick={handleJoin}>
            Зареєструватися
        </DefaultButton>
    );
};

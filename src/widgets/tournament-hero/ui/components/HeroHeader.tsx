import React from 'react';
import type { TournamentStatus } from '@entities/tournament';
import styles from './HeroHeader.module.css';

interface HeroHeaderProps {
    status: TournamentStatus;
    title: string;
}

const getStatusConfig = (status: TournamentStatus) => {
    switch (status) {
        case 'DR': return { label: 'Чернетка', colorClass: styles.statusDraft };
        case 'RG': return { label: 'Реєстрація', colorClass: styles.statusRegistration };
        case 'RN': return { label: 'Триває', colorClass: styles.statusActive };
        case 'FN': return { label: 'Завершено', colorClass: styles.statusFinished };
        case 'AR': return { label: 'Архів', colorClass: styles.statusArchive };
        default: return { label: 'Невідомо', colorClass: styles.statusDraft };
    }
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ status, title }) => {
    const statusConfig = getStatusConfig(status);

    return (
        <header className={styles.heroHeader}>
            <div className={`${styles.statusBadge} ${statusConfig.colorClass}`}>
                <div className={styles.statusDot} />
                {statusConfig.label}
            </div>
            <h1 className={styles.title}>{title}</h1>
        </header>
    );
};


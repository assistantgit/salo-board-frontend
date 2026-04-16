import React from 'react';
import { Skeleton, Divider } from '@shared/ui';
import styles from './TournamentTeams.module.css';

/**
 * Skeleton for TournamentTeams widget
 */
export const TournamentTeamsSkeleton: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <h2 className={styles.title}>Команди</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Skeleton.Circle size={32} />
                    <Skeleton.Circle size={32} />
                </div>
            </div>

            <Divider />

            <div className={styles.statsRow}>
                <Skeleton width={80} height={14} borderRadius={4} />
            </div>

            <Skeleton.Rect height={20} borderRadius={10} className={styles.progressBarOverride} />

            <div className={styles.teamList}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <React.Fragment key={i}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0' }}>
                            <Skeleton.Circle size={34} />
                            <Skeleton width={`${Math.floor(Math.random() * (60 - 40) + 40)}%`} height={20} borderRadius={4} />
                        </div>
                        {i < 4 && <Divider />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

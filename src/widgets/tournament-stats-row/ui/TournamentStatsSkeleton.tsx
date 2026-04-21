import React from 'react';
import { Skeleton } from '@shared/ui';
import styles from './TournamentStatsRow.module.css';

export const TournamentStatsSkeleton: React.FC = () => {
    return (
        <div className={styles.row}>
            {[1, 2, 3, 4].map((i) => (
                <Skeleton
                    key={i}
                    width="100%"
                    height={105}
                    style={{
                        borderRadius: '25px',
                        maxWidth: '273px'
                    }}
                />
            ))}
        </div>
    );
};

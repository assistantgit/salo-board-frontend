import React from 'react';
import { useActiveTournamentsCount } from '@entities/tournament';
import styles from './Hero.module.css';

/**
 * Hero Widget.
 * Displays the main landing section with a dynamic active-tournaments badge,
 * tagline headline and description.
 *
 * SRP: orchestrates Hero UI with data from entities layer.
 */
export const Hero: React.FC = () => {
    const activeTournamentsCount = useActiveTournamentsCount();

    // Show badge only when loaded and there is at least 1 active tournament
    const showBadge = activeTournamentsCount > 0;

    return (
        <section className={styles.hero}>
            {showBadge && (
                <div className={styles.badge}>
                    <span className={styles.badgeText}>
                        {activeTournamentsCount} активних турнірів
                    </span>
                </div>
            )}

            <div className={styles.headline}>
                <h1 className={styles.headlineWord}>Змагайся.</h1>
                <span className={styles.headlineWordAccent}>Перемагай.</span>
                <span className={styles.headlineWord}>Підкорюй.</span>
            </div>

            <p className={styles.description}>
                Відстежуй усі турніри в одному місці — від реєстрації до фіналу.
                Слідкуй за завданнями своєї команди та подавай результати швидко.
            </p>
        </section>
    );
};

import { useActiveTournamentsCount } from '@entities/tournament';
import { QuickNavigationWidget } from '@widgets/quick-navigation';
import type React from 'react';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const activeTournamentsCount = useActiveTournamentsCount();

  const showBadge = activeTournamentsCount > 0;

  return (
    <section className={styles.hero}>
      <div className={styles.heroLeft}>
        {showBadge && (
          <div className={styles.badge}>
            <span className={styles.badgeText}>{activeTournamentsCount} активних турнірів</span>
          </div>
        )}

        <div className={styles.headline}>
          <h1 className={styles.headlineWord}>Змагайся.</h1>
          <span className={styles.headlineWordAccent}>Перемагай.</span>
          <span className={styles.headlineWord}>Підкорюй.</span>
        </div>

        <p className={styles.description}>
          Відстежуй усі турніри в одному місці — від реєстрації до фіналу. Слідкуй за завданнями
          своєї команди та подавай результати швидко.
        </p>
      </div>

      <div className={styles.heroRight}>
        <QuickNavigationWidget />
      </div>
    </section>
  );
};

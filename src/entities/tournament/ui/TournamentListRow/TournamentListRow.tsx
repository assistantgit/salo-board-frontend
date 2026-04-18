import type { ElementType } from 'react';
import styles from './TournamentListRow.module.css';

interface TournamentListRowProps {
  icon: ElementType;
  title: string;
  teamsCount?: number | null;
}

export const TournamentListRow = ({
  icon: Icon,
  title,
  teamsCount,
}: TournamentListRowProps) => {
  return (
    <div className={styles.row}>
      <div className={styles.iconContainer}>
        <Icon size="lg" />
      </div>

      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <div className={styles.meta}>
          {teamsCount != null ? <span>{teamsCount} команд</span> : <span>0 команд</span>}
        </div>
      </div>
    </div>
  );
};

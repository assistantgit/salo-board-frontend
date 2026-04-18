import type { ElementType } from 'react';
import styles from './TournamentListRow.module.css';

interface TournamentListRowProps {
  icon: ElementType;
  title: string;
  teamsCount?: number | null;
  endedAt?: Date;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export const TournamentListRow = ({
  icon: Icon,
  title,
  teamsCount,
  endedAt,
}: TournamentListRowProps) => {
  const isValidDate = endedAt instanceof Date && !isNaN(endedAt.getTime());

  return (
    <div className={styles.row}>
      <div className={styles.iconContainer}>
        <Icon size="lg" />
      </div>

      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <div className={styles.meta}>
          {teamsCount != null && <span>{teamsCount} команд</span>}
          {teamsCount != null && isValidDate && <span className={styles.dot} />}
          {isValidDate && <span>Закінчується - {formatDate(endedAt!)}</span>}
        </div>
      </div>
    </div>
  );
};

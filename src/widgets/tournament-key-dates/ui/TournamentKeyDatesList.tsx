import type { KeyDateItem } from '@entities/tournament';
import styles from './TournamentKeyDates.module.css';

interface TournamentKeyDatesListProps {
  items: KeyDateItem[];
}

export function TournamentKeyDatesList({ items }: TournamentKeyDatesListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.label} className={styles.row}>
          <span
            className={item.state === 'upcoming' ? styles.dotOutlined : styles.dotFilled}
            aria-hidden='true'
          />
          <span className={styles.label}>{item.label}</span>
          <span className={styles.date}>{item.date}</span>
        </li>
      ))}
    </ul>
  );
}

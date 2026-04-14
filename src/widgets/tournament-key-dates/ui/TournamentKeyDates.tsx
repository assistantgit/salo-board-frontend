import { type KeyDateItem } from "@entities/tournament";
import styles from './TournamentKeyDates.module.css';

interface TournamentKeyDatesProps {
  items: KeyDateItem[];
}

/**
 * Widget — "Ключові дати"
 *
 * Design specs (Ultra-compact):
 * - Card: border-radius 25px, white bg, #c1c1c1 border
 * - Title: 20px, 500, IBM Plex Serif, left=20px from card edge
 * - Dividers: full-width horizontal lines
 * - Each row: 38px tall, dot at 20px | label at 8px gap | date right-aligned
 * - Dot size: 12px
 */
export function TournamentKeyDates({ items }: TournamentKeyDatesProps) {
  return (
    <aside className={styles.card}>
      {/* Header: title + full-width divider */}
      <div className={styles.header}>
        <h2 className={styles.title}>Ключові дати</h2>
      </div>
      <div className={styles.headerDivider} />

      {/* Date rows */}
      <ul className={styles.list}>
        {items.map((item, idx) => (
          <li key={idx} className={styles.row}>
            <span
              className={
                item.state === 'upcoming' ? styles.dotOutlined : styles.dotFilled
              }
              aria-hidden="true"
            />
            <span className={styles.label}>{item.label}</span>
            <span className={styles.date}>{item.date}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

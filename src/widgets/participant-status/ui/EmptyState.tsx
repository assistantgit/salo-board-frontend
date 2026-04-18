import { SearchIcon } from '@shared/ui/icons';
import styles from './ParticipantStatusWidget.module.css';

export const EmptyState = () => (
  <div className={styles.emptyState}>
    <SearchIcon className={styles.emptyIcon} />
    <span className={styles.emptyText}>Ви не берете участь у жодному активному турнірі</span>
  </div>
);

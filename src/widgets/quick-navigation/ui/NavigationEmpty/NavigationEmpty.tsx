import { SearchIcon } from '@shared/ui/icons';
import styles from './NavigationEmpty.module.css';

/**
 * Empty state for QuickNavigationWidget.
 * Shown when the user has no active tournaments in any role.
 */
export const NavigationEmpty = () => (
  <div className={styles.empty}>
    <div className={styles.iconWrap}>
      <SearchIcon className={styles.icon} />
    </div>
    <div className={styles.content}>
      <h3 className={styles.title}>Поки що порожньо</h3>
      <p className={styles.subtitle}>
        Ви не берете участь у жодному активному турнірі. Знайдіть свій перший турнір у списку!
      </p>
    </div>
  </div>
);

import { PersonIcon } from '@shared/ui/icons';
import styles from './NavigationGuest.module.css';

/**
 * Shown inside QuickNavigationWidget when the user is not authenticated.
 * Prompts them to register / log in.
 */
export const NavigationGuest = () => (
  <div className={styles.guest}>
    <div className={styles.iconWrap}>
      <PersonIcon className={styles.icon} />
    </div>
    <div className={styles.content}>
      <h3 className={styles.title}>Доєднайтеся до нас</h3>
      <p className={styles.subtitle}>
        Зареєструйтеся, щоб керувати своїми турнірами та відстежувати прогрес у реальному часі
      </p>
    </div>
  </div>
);

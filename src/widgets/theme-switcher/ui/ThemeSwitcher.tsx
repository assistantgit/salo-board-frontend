import { createIcon, useTheme } from '@shared/lib';
import styles from './ThemeSwitcher.module.css';

/* ── Ion icons ────────────────────────────────────────────────── */

const SunIcon = createIcon('sunny-outline', 'sunny');
const MoonIcon = createIcon('moon-outline', 'moon');

/* ── Component ────────────────────────────────────────────────── */

/**
 * Icon-button toggle. Light → shows Moon, Dark → shows Sun.
 * Icons animate in/out via CSS only.
 */
export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type='button'
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
    >
      {/* Sun — visible in dark mode */}
      <span
        className={`${styles.themeToggleIcon} ${styles.themeToggleIconSun}${isDark ? ` ${styles.themeToggleIconVisible}` : ''}`}
      >
        <SunIcon size='sm' />
      </span>

      {/* Moon — visible in light mode */}
      <span
        className={`${styles.themeToggleIcon} ${styles.themeToggleIconMoon}${!isDark ? ` ${styles.themeToggleIconVisible}` : ''}`}
      >
        <MoonIcon size='sm' />
      </span>
    </button>
  );
};

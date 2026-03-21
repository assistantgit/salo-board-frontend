import { useTheme, createIcon } from '@shared/lib';
import './ThemeSwitcher.css';

/* ── Ion icons ────────────────────────────────────────────────── */

const SunIcon  = createIcon('sunny-outline',  'sunny');
const MoonIcon = createIcon('moon-outline',   'moon');

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
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
    >
      {/* Sun — visible in dark mode */}
      <span className={`theme-toggle__icon theme-toggle__icon--sun${isDark ? ' theme-toggle__icon--visible' : ''}`}>
        <SunIcon size="sm" />
      </span>

      {/* Moon — visible in light mode */}
      <span className={`theme-toggle__icon theme-toggle__icon--moon${!isDark ? ' theme-toggle__icon--visible' : ''}`}>
        <MoonIcon size="sm" />
      </span>
    </button>
  );
};

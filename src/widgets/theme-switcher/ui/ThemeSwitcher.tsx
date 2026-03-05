import { useTheme, createIcon } from '@shared/lib';
import './ThemeSwitcher.css';

/* ── Ion icons ────────────────────────────────────────────────── */

const SunIcon  = createIcon('sunny-outline',  'sunny');
const MoonIcon = createIcon('moon-outline',   'moon');

/* ── Component ────────────────────────────────────────────────── */

/**
 * Single icon-button toggle.
 *
 * Light theme → shows Moon icon   (click = switch to dark)
 * Dark  theme → shows Sun  icon   (click = switch to light)
 *
 * The outgoing icon slides up + fades, the incoming slides in from below.
 * Pure CSS — no JS animation, no framer-motion.
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

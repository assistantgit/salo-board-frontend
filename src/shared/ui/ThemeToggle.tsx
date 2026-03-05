import { useTheme, createIcon } from '@shared/lib';
import './ThemeToggle.css';

const SunIcon  = createIcon('sunny-outline',  'sunny');
const MoonIcon = createIcon('moon-outline',   'moon');

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__thumb" aria-hidden="true">
          {isDark ? <MoonIcon size="xs" /> : <SunIcon size="xs" />}
        </span>
      </span>
    </button>
  );
};


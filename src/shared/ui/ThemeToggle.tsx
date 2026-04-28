import { useTheme } from '@shared/lib';
import './ThemeToggle.css';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className='theme-toggle'
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span className='theme-toggle__track'>
        <span className='theme-toggle__thumb' aria-hidden='true'>
          {isDark ? <MoonIcon size='xs' /> : <SunIcon size='xs' />}
        </span>
      </span>
    </button>
  );
};

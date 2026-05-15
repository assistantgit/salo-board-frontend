import { IconButton, type IconButtonProps } from '../buttons/IconButton';
import styles from './NavButton.module.css';

/**
 * Базовий компонент навігаційної кнопки з текстом та іконкою.
 * Розширює IconButton для дотримання принципів SOLID.
 */
export const NavButton = ({ className = '', ...props }: IconButtonProps) => {
  return <IconButton className={`${styles['nav-btn']} ${className}`} {...props} />;
};

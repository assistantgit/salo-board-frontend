import styles from './Divider.module.css';

interface DividerProps {
  className?: string;
  margin?: string | number;
}

/**
 * Shared horizontal line component.
 * Follows the design from UserDetails' divider.
 */
export const Divider = ({ className, margin }: DividerProps) => {
  return (
    <div
      className={`${styles.divider} ${className || ''}`}
      style={margin !== undefined ? { margin } : undefined}
    />
  );
};

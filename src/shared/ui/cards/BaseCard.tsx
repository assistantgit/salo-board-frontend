import type React from 'react';
import styles from './BaseCard.module.css';

interface BaseCardProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

/**
 * Foundational Card component.
 * Provides consistent shadows, borders, and hover effects.
 */
export const BaseCard: React.FC<BaseCardProps> = ({
  header,
  children,
  footer,
  onClick,
  className,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className={`${styles.card} ${onClick ? styles.clickable : ''} ${className || ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </article>
  );
};

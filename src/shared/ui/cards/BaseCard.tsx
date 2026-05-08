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
  return (
    <article
      className={`${styles.card} ${onClick ? styles.clickable : ''} ${className || ''}`}
      onClick={onClick}
    >
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </article>
  );
};

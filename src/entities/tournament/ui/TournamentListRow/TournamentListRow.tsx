import type React from 'react';
import type { ElementType } from 'react';
import styles from './TournamentListRow.module.css';

interface TournamentListRowProps {
  icon: ElementType;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export const TournamentListRow = ({
  icon: Icon,
  title,
  subtitle,
  onClick,
}: TournamentListRowProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      type='button'
      className={`${styles.row} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : -1}
      disabled={!onClick}
    >
      <div className={styles.inner}>
        <div className={styles.iconContainer}>
          <Icon size='lg' />
        </div>

        <div className={styles.content}>
          <span className={styles.title}>{title}</span>
          <div className={styles.meta}>
            <span>{subtitle}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

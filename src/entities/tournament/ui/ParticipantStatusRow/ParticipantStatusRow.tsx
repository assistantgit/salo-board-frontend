import type React from 'react';
import type { ElementType, ReactNode } from 'react';
import styles from './ParticipantStatusRow.module.css';

interface ParticipantStatusRowProps {
  icon: ElementType;
  iconBgVariant?: 'blue' | 'yellow' | 'green';
  subtitle: string;
  title: string;
  rightSlot?: ReactNode;
  onClick?: () => void;
}

export const ParticipantStatusRow = ({
  icon: Icon,
  iconBgVariant = 'blue',
  subtitle,
  title,
  rightSlot,
  onClick,
}: ParticipantStatusRowProps) => {
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
        <div className={`${styles.iconContainer} ${styles[iconBgVariant]}`}>
          <Icon size='lg' className={styles.icon} />
        </div>

        <div className={styles.content}>
          <span className={styles.subtitle}>{subtitle}</span>
          <span className={styles.title}>{title}</span>
        </div>

        {rightSlot && <div className={styles.rightSlot}>{rightSlot}</div>}
      </div>
    </button>
  );
};

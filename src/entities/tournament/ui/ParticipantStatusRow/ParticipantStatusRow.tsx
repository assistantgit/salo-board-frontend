import type { ReactNode, ElementType } from 'react';
import styles from './ParticipantStatusRow.module.css';

interface ParticipantStatusRowProps {
  icon: ElementType;
  iconBgVariant?: 'blue' | 'yellow' | 'green';
  subtitle: string;
  title: string;
  rightSlot?: ReactNode;
}

export const ParticipantStatusRow = ({
  icon: Icon,
  iconBgVariant = 'blue',
  subtitle,
  title,
  rightSlot
}: ParticipantStatusRowProps) => {
  return (
    <div className={styles.row}>
      <div className={`${styles.iconContainer} ${styles[iconBgVariant]}`}>
        <Icon size="lg" className={styles.icon} />
      </div>
      
      <div className={styles.content}>
        <span className={styles.subtitle}>{subtitle}</span>
        <span className={styles.title}>{title}</span>
      </div>
      
      {rightSlot && (
        <div className={styles.rightSlot}>
          {rightSlot}
        </div>
      )}
    </div>
  );
};

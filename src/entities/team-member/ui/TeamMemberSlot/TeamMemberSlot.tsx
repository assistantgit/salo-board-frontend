import type React from 'react';
import styles from './TeamMemberSlot.module.css';

export interface TeamMemberSlotProps {
  label?: string;
  className?: string;
}

/**
 * TeamMemberSlot component represents an empty placeholder in the team list.
 * Follows the same square aspect ratio as TeamMemberCard.
 */
export const TeamMemberSlot: React.FC<TeamMemberSlotProps> = ({
  label = 'Очікування учасника...',
  className = '',
}) => {
  return (
    <div className={`${styles['team-member-slot']} ${className}`}>
      <div className={styles['team-member-slot__content']}>
        <div className={styles['team-member-slot__circle']} aria-hidden='true'>
          <span className={styles['team-member-slot__question']}>?</span>
        </div>
        <p className={styles['team-member-slot__label']}>{label}</p>
      </div>
    </div>
  );
};

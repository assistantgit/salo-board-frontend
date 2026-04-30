import { getInitials } from '@shared/lib';
import { CloseIcon } from '@shared/ui';
import type React from 'react';
import type { TeamMember } from '../../model/types';
import styles from './TeamMemberCard.module.css';

export interface TeamMemberCardProps {
  member: TeamMember;
  onDelete?: (id: string) => void;
  className?: string;
}

/**
 * TeamMemberCard component displays team member information including avatar, name,
 * and badges for lead status and current user identification.
 *
 * Based on design Node ID: KhRZn
 */
export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  onDelete,
  className = '',
}) => {
  const initials = getInitials(member.fullName);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(member.id);
  };

  const hasLeadBadge = member.isLead;
  const hasCurrentBadge = member.isCurrentUser;
  const showDelete = member.canBeDeleted;

  return (
    <article className={`${styles['team-member-card']} ${className}`}>
      <div className={styles['team-member-card__toolbar']}>
        <div className={styles['team-member-card__badge-container']}>
          {hasLeadBadge && (
            <span
              className={`${styles['team-member-card__badge']} ${styles['team-member-card__badge--lead']}`}
            >
              Лідер
            </span>
          )}
        </div>

        <div className={styles['team-member-card__actions']}>
          {hasCurrentBadge && (
            <span
              className={`${styles['team-member-card__badge']} ${styles['team-member-card__badge--current']}`}
            >
              Ви
            </span>
          )}
          {showDelete && (
            <button
              type='button'
              className={styles['team-member-card__delete-btn']}
              onClick={handleDelete}
              aria-label={`Видалити ${member.fullName}`}
            >
              <CloseIcon size='2xl' />
            </button>
          )}
        </div>
      </div>

      <div className={styles['team-member-card__avatar']} aria-hidden='true'>
        <span className={styles['team-member-card__initials']}>{initials}</span>
      </div>

      <p className={styles['team-member-card__name']} title={member.fullName}>
        {member.fullName}
      </p>
    </article>
  );
};

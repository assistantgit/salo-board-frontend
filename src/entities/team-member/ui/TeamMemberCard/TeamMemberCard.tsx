import { UserAvatar } from '@entities/user';
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
 * TeamMemberCard component displays team member information.
 * Uses UserAvatar in 'clean' variant to match design node h5EQ7B.
 */
export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  onDelete,
  className = '',
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(member.id);
  };

  const hasLeadBadge = member.isLead;
  const hasCurrentBadge = member.isCurrentUser;
  const showDelete = member.canBeDeleted && !member.isCurrentUser;
  const isPending = member.isPending;

  return (
    <article
      className={`${styles['team-member-card']} ${isPending ? styles['team-member-card--pending'] : ''} ${className}`}
    >
      <div className={styles['team-member-card__toolbar']}>
        <div className={styles['team-member-card__badge-container']}>
          {hasLeadBadge && (
            <span
              className={`${styles['team-member-card__badge']} ${styles['team-member-card__badge--lead']}`}
            >
              Лідер
            </span>
          )}
          {isPending && (
            <span
              className={`${styles['team-member-card__badge']} ${styles['team-member-card__badge--pending']}`}
            >
              Очікування
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
              <CloseIcon size='xl' />
            </button>
          )}
        </div>
      </div>

      <UserAvatar
        fullName={member.fullName}
        className={styles['team-member-card__avatar']}
        size='2xl'
        variant='clean'
      />

      <p className={styles['team-member-card__name']} title={member.fullName}>
        {member.fullName}
      </p>
    </article>
  );
};

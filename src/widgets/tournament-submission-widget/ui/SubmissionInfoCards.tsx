import type { SubmissionDto } from '@entities/team';
import { formatSubmissionDate } from '@shared/lib';
import { CheckIcon, InfoCard, TimerIcon } from '@shared/ui';
import type React from 'react';
import styles from './SubmissionInfoCards.module.css';

interface SubmissionInfoCardsProps {
  submission: SubmissionDto;
}

const UpdateIcon = (
  <div className={`${styles.iconCircle} ${styles['iconCircle--update']}`}>
    <TimerIcon size={'md'} />
  </div>
);

const SubmitIcon = (
  <div className={`${styles.iconCircle} ${styles['iconCircle--submit']}`}>
    <CheckIcon size={'md'} />
  </div>
);

export const SubmissionInfoCards: React.FC<SubmissionInfoCardsProps> = ({ submission }) => {
  return (
    <div className={styles.cards}>
      <InfoCard
        variant='compact'
        icon={UpdateIcon}
        label='Останнє оновлення'
        value={formatSubmissionDate(submission.createdAt)}
      />
      {submission.submittedAt && (
        <InfoCard
          variant='compact'
          icon={SubmitIcon}
          label='Робота була відправлена'
          value={formatSubmissionDate(submission.submittedAt)}
        />
      )}
    </div>
  );
};

import type { SubmissionDto } from '@entities/team';
import type { RoundDto } from '@entities/tournament';
import { PeopleIcon } from '@shared/ui';
import type React from 'react';
import styles from './SubmissionInfoCard.module.css';

interface TeamIdentifierCardProps {
  submission: SubmissionDto;
  round?: RoundDto;
}

export const TeamIdentifierCard: React.FC<TeamIdentifierCardProps> = ({ submission, round }) => {
  return (
    <div className={styles.teamCard}>
      <div className={styles.teamLabel}>
        <PeopleIcon className={styles.teamIcon} />
        <span>Команда</span>
      </div>

      <div className={styles.teamName}>{submission.teamName}</div>
      {round && <div className={styles.roundTitle}>{round.title}</div>}
    </div>
  );
};

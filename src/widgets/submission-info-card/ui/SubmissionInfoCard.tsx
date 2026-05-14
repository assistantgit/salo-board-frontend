import { useEvaluationParams } from '@entities/evaluation';
import { useAdminSubmission } from '@entities/submission';
import { useRoundDetails } from '@entities/tournament';
import { Skeleton } from '@shared/ui';
import type React from 'react';

import styles from './SubmissionInfoCard.module.css';
import { SubmissionMetaLinks } from './SubmissionMetaLinks';
import { TeamIdentifierCard } from './TeamIdentifierCard';

interface SubmissionInfoCardProps {
  tournamentId?: number;
  roundId?: number;
  submissionId?: number;
  isAdmin?: boolean;
}

/**
 * Left column of the Evaluation page.
 * Shows all submission metadata: team name, links, description, dates.
 * Self-contained: fetches its own data, falls back to URL params.
 */
export const SubmissionInfoCard: React.FC<SubmissionInfoCardProps> = ({
  tournamentId: propTournamentId,
  roundId: propRoundId,
  submissionId: propSubmissionId,
  isAdmin = false,
}) => {
  const {
    tournamentId: paramTournamentId,
    roundId: paramRoundId,
    submissionId: paramSubmissionId,
  } = useEvaluationParams();

  const tId = propTournamentId ?? paramTournamentId;
  const rId = propRoundId ?? paramRoundId;
  const sId = propSubmissionId ?? paramSubmissionId;

  const { data: submission, isLoading: isSubmissionLoading } = useAdminSubmission(tId, rId, sId);
  const { data: round, isLoading: isRoundLoading } = useRoundDetails(tId, rId, isAdmin);

  if (isSubmissionLoading || isRoundLoading) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <Skeleton style={{ width: '150px', height: '28px' }} />
        </div>
        <div className={styles.content}>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Skeleton style={{ width: '100%', height: '80px', borderRadius: '12px' }} />
            <Skeleton style={{ width: '100%', height: '120px', borderRadius: '12px' }} />
            <Skeleton style={{ width: '100%', height: '60px', borderRadius: '12px' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!submission) return null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>{isAdmin ? 'Деталі роботи' : 'Оцінювання'}</h2>
      </div>

      <div className={styles.content}>
        <TeamIdentifierCard submission={submission} round={round} />
        <SubmissionMetaLinks submission={submission} />
      </div>
    </div>
  );
};

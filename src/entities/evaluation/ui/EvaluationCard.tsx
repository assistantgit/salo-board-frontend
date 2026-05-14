import { TournamentCardHeader } from '@entities/tournament';
import type { JuryEvaluationDto } from '@entities/tournament/model/tournament.types';
import { BaseCard, DefaultButton } from '@shared/ui';
import type React from 'react';
import styles from './EvaluationCard.module.css';

interface EvaluationCardProps {
  evaluation: JuryEvaluationDto;
  onAction?: (id: number) => void;
  actionLabel?: string;
  tournamentTitle?: string;
  roundTitle?: string;
}

const STATUS_LABELS = {
  DR: 'Чернетка',
  SB: 'Надіслано',
};

const STATUS_VARIANTS: Record<string, 'DR' | 'RG' | 'RN' | 'FN' | 'AR'> = {
  DR: 'RG', // Green for draft in this context
  SB: 'FN', // Blue for submitted
};

export const EvaluationCard: React.FC<EvaluationCardProps> = ({
  evaluation,
  onAction,
  actionLabel = 'Детальніше',
  tournamentTitle = 'Турнір',
  roundTitle = 'Раунд',
}) => {
  const { id, juryFirstName, juryLastName, status, submittedAt, createdAt } = evaluation;
  const displayJuryName =
    juryFirstName || juryLastName
      ? `${juryFirstName || ''} ${juryLastName || ''}`.trim()
      : 'Анонімний суддя';

  const handleAction = () => onAction?.(id);

  return (
    <BaseCard
      className={styles.card}
      header={
        <TournamentCardHeader
          title={tournamentTitle}
          status={STATUS_VARIANTS[status]}
          statusLabel={STATUS_LABELS[status]}
          withBackground={true}
        />
      }
      footer={
        <DefaultButton className={styles.actionButton} onClick={handleAction}>
          {actionLabel}
        </DefaultButton>
      }
    >
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Суддя</span>
          <span className={styles.statValue}>{displayJuryName}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Раунд</span>
          <span className={styles.statValue}>{roundTitle}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Робота</span>
          <span className={styles.statValue}>#{evaluation.submission}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Дата</span>
          <span className={styles.statValue}>
            {new Date(submittedAt || createdAt).toLocaleDateString('uk-UA')}
          </span>
        </div>
      </div>
    </BaseCard>
  );
};

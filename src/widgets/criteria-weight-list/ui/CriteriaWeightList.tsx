import { useRoundCriteria, useRounds } from '@entities/tournament';
import { CriteriaCard } from '@shared/ui/CriteriaCard';
import type React from 'react';
import styles from './CriteriaWeightList.module.css';

interface CriteriaWeightListProps {
  tournamentId: number | string;
}

export const CriteriaWeightList: React.FC<CriteriaWeightListProps> = ({ tournamentId }) => {
  const { rounds, isLoading } = useRounds(tournamentId);

  if (isLoading) return <div className={styles.skeleton} />;

  const filteredRounds = rounds.filter((r) => r.status !== 'DR');
  if (filteredRounds.length === 0) return null;

  const sortedRounds = [...filteredRounds].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Вага критеріїв по раундах</h3>
      <div className={styles.roundsList}>
        {sortedRounds.map((round, index) => (
          <RoundCriteriaSection
            key={round.id}
            tournamentId={tournamentId}
            roundId={round.id}
            roundTitle={round.title}
            roundStatus={round.status}
            roundNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

interface RoundCriteriaSectionProps {
  tournamentId: number | string;
  roundId: number;
  roundTitle: string;
  roundStatus: string;
  roundNumber: number;
}

const RoundCriteriaSection: React.FC<RoundCriteriaSectionProps> = ({
  tournamentId,
  roundId,
  roundTitle,
  roundStatus,
  roundNumber,
}) => {
  const { data: criteria, isLoading } = useRoundCriteria(tournamentId, roundId);

  if (isLoading) return <div className={styles.roundSkeleton} />;
  if (!criteria || criteria.length === 0) return null;

  const statusLabel =
    roundStatus === 'DR' ? '(Очікується)' : roundStatus === 'AC' ? '(Активний)' : '(Завершено)';

  return (
    <div className={styles.roundSection}>
      <h4 className={styles.roundTitle}>
        Раунд {roundNumber}: {roundTitle} <span className={styles.statusLabel}>{statusLabel}</span>
      </h4>
      <div className={styles.criteriaGrid}>
        {criteria.map((c) => (
          <CriteriaCard key={c.id} title={c.title} weight={c.weight} maxPoints={c.maxScore} />
        ))}
      </div>
    </div>
  );
};

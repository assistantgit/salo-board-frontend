import { InfoCard, PeopleIcon, PodiumIcon, Skeleton, TimerIcon } from '@shared/ui';
import { TrophyIcon } from '@shared/ui/icons/StatusIcons';
import type React from 'react';
import { useRoundInfoCards } from '../lib/useRoundInfoCards';
import styles from './RoundInfoCards.module.css';

interface RoundInfoCardsProps {
  tournamentId: number;
  roundId: number;
}

export const RoundInfoCards: React.FC<RoundInfoCardsProps> = ({ tournamentId, roundId }) => {
  const { stats, isLoading } = useRoundInfoCards(tournamentId, roundId);

  if (isLoading)
    return (
      <div className={styles.grid}>
        <Skeleton className={styles.cardSkeleton} />
      </div>
    );
  if (!stats) return null;

  return (
    <div className={styles.grid}>
      <InfoCard
        label='Загальний бал'
        value={stats.isEvaluated ? stats.score : '—'}
        icon={<TrophyIcon />}
        variant='primary'
      />
      <InfoCard label='Ваше місце' value={stats.rank} icon={<PodiumIcon />} />
      <InfoCard label='Статус команди' value={stats.status} icon={<PeopleIcon />} />
      <InfoCard
        label='Дедлайн'
        value={stats.timeLeft || '—'}
        subtitle={stats.deadlineDate}
        icon={<TimerIcon />}
      />
    </div>
  );
};

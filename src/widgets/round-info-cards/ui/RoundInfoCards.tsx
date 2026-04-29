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
      <div className={styles.row}>
        <Skeleton className={styles.cardSkeleton} />
        <Skeleton className={styles.cardSkeleton} />
        <Skeleton className={styles.cardSkeleton} />
        <Skeleton className={styles.cardSkeleton} />
      </div>
    );
  if (!stats) return null;

  return (
    <div className={styles.row}>
      <InfoCard
        label='Загальний бал'
        value={stats.isEvaluated ? stats.score : '—'}
        icon={<TrophyIcon size={'2xl'} />}
        variant='primary'
        className={styles.card}
      />
      <InfoCard
        label='Ваше місце'
        value={stats.rank}
        icon={<PodiumIcon size={'2xl'} />}
        className={styles.card}
      />
      <InfoCard
        label='Статус команди'
        value={stats.status}
        icon={<PeopleIcon size={'2xl'} />}
        className={styles.card}
      />
      <InfoCard
        label='Дедлайн'
        value={stats.timeLeft || '—'}
        subtitle={stats.deadlineDate}
        icon={<TimerIcon size={'2xl'} />}
        className={styles.card}
      />
    </div>
  );
};

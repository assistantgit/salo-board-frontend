import { useRounds, useTournament } from '@entities/tournament';
import { Skeleton } from '@shared/ui';
import React, { useMemo } from 'react';
import styles from './RoundsTimeline.module.css';

interface RoundsTimelineProps {
  tournamentId: number;
}

export const RoundsTimeline: React.FC<RoundsTimelineProps> = ({ tournamentId }) => {
  const { rounds, isLoading: roundsLoading } = useRounds(tournamentId);
  const { tournament, isLoading: tournamentLoading } = useTournament(tournamentId);

  const timelineItems = useMemo(() => {
    if (!rounds.length) return [];

    const sortedRounds = [...rounds].sort((a, b) => a.orderIndex - b.orderIndex);

    const items = sortedRounds.map((round) => ({
      id: `round-${round.id}`,
      title: round.title,
      status: round.status,
      isRound: true,
      isLast: false,
    }));

    if (tournament?.endedAt) {
      items.push({
        id: 'tournament-end',
        title: 'Фінал',
        status: 'FN' as any, // Final status
        isRound: false,
        isLast: true,
      });
    }

    return items;
  }, [rounds, tournament]);

  if (roundsLoading || tournamentLoading) return <Skeleton className={styles.skeleton} />;
  if (!timelineItems.length) return null;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'DR':
        return 'Очікується';
      case 'AC':
        return 'В процесі';
      case 'SC':
        return 'Оцінюється';
      case 'EV':
        return 'Завершено';
      case 'FN':
        return 'Фініш';
      default:
        return 'Очікується';
    }
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.sectionTitle}>Глобальний огляд раундів</h3>

      <div className={styles.timelineWrapper}>
        <div className={styles.timelineContainer}>
          {timelineItems.map((item, index) => {
            const isCompleted = item.status === 'EV' || item.status === 'SC';
            const isActive = item.status === 'AC';

            return (
              <React.Fragment key={item.id}>
                <div
                  className={`${styles.item} ${isCompleted ? styles.completed : ''} ${isActive ? styles.active : ''}`}
                >
                  <div className={styles.markerRow}>
                    <div className={styles.markerOuter}>
                      <div className={styles.markerInner} />
                    </div>
                  </div>

                  <div className={styles.labels}>
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.status}>{getStatusLabel(item.status)}</span>
                  </div>
                </div>

                {index < timelineItems.length - 1 && (
                  <div className={`${styles.line} ${isCompleted ? styles.completedLine : ''}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

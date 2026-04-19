import {
  ParticipantStatusRow,
  useActiveRound,
  useJuryEvaluationsCount,
  type TournamentDomain,
} from '@entities/tournament';
import { TrophyIcon, ClipboardIcon, TimeIcon } from '@shared/ui/icons';
import { DeadlineBadge, RoundBadge } from '@shared/ui/badges';
import { NavigationSkeleton } from '../../NavigationSkeleton/NavigationSkeleton';
import styles from './JuryRoleView.module.css';

interface JuryRoleViewProps {
  tournament: TournamentDomain;
}

/**
 * Detail view for the "jury" role.
 * Shows: total teams, current round with deadline, pending submissions count with round index.
 */
export const JuryRoleView = ({ tournament }: JuryRoleViewProps) => {
  const { data: activeRound,      isLoading: loadingRound } = useActiveRound(tournament.id);
  const { data: evaluationsCount, isLoading: loadingEvals } = useJuryEvaluationsCount(tournament.id);

  if (loadingRound || loadingEvals) return <NavigationSkeleton />;

  return (
    <div className={styles.content}>
      <ParticipantStatusRow
        icon={TrophyIcon}
        iconBgVariant="yellow"
        subtitle="Кількість команд"
        title={String(tournament.teamsCount ?? 0)}
      />
      <ParticipantStatusRow
        icon={ClipboardIcon}
        iconBgVariant="green"
        subtitle="Поточний раунд"
        title={activeRound?.title ?? '—'}
        rightSlot={activeRound ? <DeadlineBadge deadline={activeRound.deadline} /> : null}
      />
      <ParticipantStatusRow
        icon={TimeIcon}
        iconBgVariant="blue"
        subtitle="Сабміти на перевірку"
        title={String(evaluationsCount?.count ?? 0)}
        rightSlot={activeRound ? <RoundBadge orderIndex={activeRound.orderIndex} /> : null}
      />
    </div>
  );
};

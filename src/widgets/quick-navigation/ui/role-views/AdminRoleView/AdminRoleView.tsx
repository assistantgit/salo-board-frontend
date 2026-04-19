import {
  ParticipantStatusRow,
  useActiveRound,
  type TournamentDomain,
} from '@entities/tournament';
import { TrophyIcon, FileTrayFullIcon } from '@shared/ui/icons';
import { DeadlineBadge } from '@shared/ui/badges';
import { NavigationSkeleton } from '../../NavigationSkeleton/NavigationSkeleton';
import styles from './AdminRoleView.module.css';

interface AdminRoleViewProps {
  tournament: TournamentDomain;
}

/**
 * Detail view for the "admin" role.
 * Shows: total teams count, current round with deadline.
 */
export const AdminRoleView = ({ tournament }: AdminRoleViewProps) => {
  const { data: activeRound, isLoading } = useActiveRound(tournament.id);

  if (isLoading) return <NavigationSkeleton />;

  return (
    <div className={styles.content}>
      <ParticipantStatusRow
        icon={TrophyIcon}
        iconBgVariant="yellow"
        subtitle="Кількість команд"
        title={String(tournament.teamsCount ?? 0)}
      />
      <ParticipantStatusRow
        icon={FileTrayFullIcon}
        iconBgVariant="green"
        subtitle="Поточний раунд"
        title={activeRound?.title ?? '—'}
        rightSlot={activeRound ? <DeadlineBadge deadline={activeRound.deadline} /> : null}
      />
    </div>
  );
};

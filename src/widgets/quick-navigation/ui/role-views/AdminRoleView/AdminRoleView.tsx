import { ParticipantStatusRow, type TournamentDomain, useActiveRound } from '@entities/tournament';
import { DeadlineBadge } from '@shared/ui/badges';
import { FileTrayFullIcon, TrophyIcon } from '@shared/ui/icons';
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
  //const navigate = useNavigate();

  if (isLoading) return <NavigationSkeleton />;

  //const handleClick = () => navigate(`/tournaments/${tournament.id}`);

  return (
    <div className={styles.content}>
      <ParticipantStatusRow
        icon={TrophyIcon}
        iconBgVariant='yellow'
        subtitle='Кількість команд'
        title={String(tournament.teamsCount ?? 0)}
        //onClick={handleClick}
      />
      <ParticipantStatusRow
        icon={FileTrayFullIcon}
        iconBgVariant='green'
        subtitle='Поточний раунд'
        title={activeRound?.title ?? '—'}
        rightSlot={activeRound ? <DeadlineBadge deadline={activeRound.deadline} /> : null}
        //onClick={handleClick}
      />
    </div>
  );
};

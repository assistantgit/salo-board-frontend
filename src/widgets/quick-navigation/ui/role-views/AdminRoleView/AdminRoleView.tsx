import { ParticipantStatusRow, type TournamentDomain, useActiveRound } from '@entities/tournament';
import { DeadlineBadge } from '@shared/ui/badges';
import { BuildIcon, FileTrayFullIcon } from '@shared/ui/icons';
import { useNavigate } from 'react-router-dom';
import { NavigationSkeleton } from '../../NavigationSkeleton/NavigationSkeleton';
import styles from './AdminRoleView.module.css';

interface AdminRoleViewProps {
  tournament: TournamentDomain;
}

/**
 * Detail view for the "admin" role.
 * Shows: current round with deadline, and link to edit.
 */
export const AdminRoleView = ({ tournament }: AdminRoleViewProps) => {
  const { data: activeRound, isLoading: loadingRound } = useActiveRound(tournament.id);
  const navigate = useNavigate();

  if (loadingRound) return <NavigationSkeleton />;

  const handleEditClick = () => navigate(`/admin/tournaments/${tournament.id}/edit`);

  return (
    <div className={styles.content}>
      <ParticipantStatusRow
        icon={FileTrayFullIcon}
        iconBgVariant='green'
        subtitle='Поточний раунд'
        title={activeRound?.title ?? '—'}
        rightSlot={activeRound ? <DeadlineBadge deadline={activeRound.deadline} /> : null}
      />
      <ParticipantStatusRow
        icon={BuildIcon}
        iconBgVariant='blue'
        subtitle='Адмін-панель'
        title='Налаштування'
        onClick={handleEditClick}
      />
    </div>
  );
};

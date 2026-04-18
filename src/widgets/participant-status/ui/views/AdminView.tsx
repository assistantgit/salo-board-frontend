import { TrophyIcon, FileTrayFullIcon } from '@shared/ui/icons';
import { StatusBadge } from '@shared/ui/badges';
import { ParticipantStatusRow, useActiveRound, type TournamentDomain } from '@entities/tournament';
import { WidgetSkeleton } from '../WidgetSkeleton';
import styles from '../ParticipantStatusWidget.module.css';

interface AdminViewProps {
  tournament: TournamentDomain;
}

export const AdminView = ({ tournament }: AdminViewProps) => {
  const { data: activeRound, isLoading } = useActiveRound(tournament.id);

  if (isLoading) return <WidgetSkeleton />;

  const deadlineTime = activeRound?.deadline
    ? new Date(activeRound.deadline).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
    : '23:59';

  return (
    <div className={styles.content}>
      <ParticipantStatusRow
        icon={TrophyIcon}
        iconBgVariant="blue"
        subtitle="Команди"
        title={tournament.teamsCount != null ? `Всього : ${tournament.teamsCount} команд` : 'Всього : 0 команд'}
      />
      <ParticipantStatusRow
        icon={FileTrayFullIcon}
        iconBgVariant="yellow"
        subtitle="Поточний раунд"
        title={activeRound?.title || 'Підготовка'}
        rightSlot={<StatusBadge variant="yellow">До {deadlineTime}</StatusBadge>}
      />
    </div>
  );
};

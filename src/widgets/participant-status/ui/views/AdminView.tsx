import { BuildIcon, TrophyIcon, FileTrayFullIcon } from '@shared/ui/icons';
import { ParticipantStatusRow, useActiveRound, type TournamentDomain } from '@entities/tournament';
import { formatDeadline } from '@shared/lib/date/formatDeadline';
import { WidgetSkeleton } from '../WidgetSkeleton';
import styles from '../ParticipantStatusWidget.module.css';

interface AdminViewProps {
  tournament: TournamentDomain;
}

export const AdminView = ({ tournament }: AdminViewProps) => {
  const { data: activeRound, isLoading } = useActiveRound(tournament.id);

  if (isLoading) return <WidgetSkeleton />;

  return (
    <div className={styles.content}>
      <ParticipantStatusRow
        icon={TrophyIcon}
        iconBgVariant="yellow"
        subtitle="Кількість команд"
        title={String(tournament.teamsCount || 0)}
      />
      <ParticipantStatusRow
        icon={FileTrayFullIcon}
        iconBgVariant="green"
        subtitle="Поточний раунд"
        title={activeRound?.title || 'Відбір мандарин'}
        rightSlot={activeRound ? (
          <span className={styles.deadlineInfo}>
            {formatDeadline(activeRound.deadline)}
          </span>
        ) : null}
      />
    </div>
  );
};

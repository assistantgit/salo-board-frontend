import { TrophyIcon, FileTrayFullIcon, ClipboardIcon } from '@shared/ui/icons';
import { ParticipantStatusRow, useActiveRound, type TournamentDomain } from '@entities/tournament';
import { useMyTeamInTournament, useLastSubmission } from '@entities/team';
import { formatDeadline } from '@shared/lib/date/formatDeadline';
import { WidgetSkeleton } from '../WidgetSkeleton';
import styles from '../ParticipantStatusWidget.module.css';

interface ParticipantViewProps {
  tournament: TournamentDomain;
}

export const ParticipantView = ({ tournament }: ParticipantViewProps) => {
  const { data: activeRound, isLoading: isLoadingRound } = useActiveRound(tournament.id);
  const { data: myTeam } = useMyTeamInTournament(tournament.id);
  const { data: lastSubmit } = useLastSubmission(myTeam?.id);

  if (isLoadingRound) return <WidgetSkeleton />;

  const submitTitle = lastSubmit
    ? `Рішення - ${activeRound?.title || 'раунду'}`
    : '—';

  return (
    <div className={styles.content}>
      <ParticipantStatusRow
        icon={TrophyIcon}
        iconBgVariant="yellow"
        subtitle="Команда"
        title={myTeam?.name || 'Без команди'}
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
      <ParticipantStatusRow
        icon={ClipboardIcon}
        iconBgVariant="blue"
        subtitle="Останній сабміт"
        title={submitTitle}
        rightSlot={activeRound ? <span className={styles.roundNumber}>#{activeRound.orderIndex}</span> : null}
      />
    </div>
  );
};

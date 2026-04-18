import { TrophyIcon, FileTrayFullIcon, ClipboardIcon } from '@shared/ui/icons';
import { StatusBadge } from '@shared/ui/badges';
import { ParticipantStatusRow, useActiveRound, type TournamentDomain } from '@entities/tournament';
import { useMyTeamInTournament, useLastSubmission } from '@entities/team';
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

  const lastSubmitDate = lastSubmit?.submittedAt
    ? new Date(lastSubmit.submittedAt).toLocaleDateString('uk-UA')
    : '—';

  return (
    <div className={styles.content}>
      <ParticipantStatusRow
        icon={TrophyIcon}
        iconBgVariant="blue"
        subtitle="Команди"
        title={tournament.teamsCount != null ? `${tournament.teamsCount} команд` : '—'}
      />
      <ParticipantStatusRow
        icon={FileTrayFullIcon}
        iconBgVariant="yellow"
        subtitle="Поточний раунд"
        title={activeRound?.title || 'Відбір мандарин'}
        rightSlot={activeRound ? <StatusBadge variant="yellow">Активний</StatusBadge> : null}
      />
      <ParticipantStatusRow
        icon={ClipboardIcon}
        iconBgVariant="green"
        subtitle="Останній сабміт"
        title={lastSubmitDate}
      />
    </div>
  );
};

import {
  ParticipantStatusRow,
  useActiveRound,
  type TournamentDomain,
} from '@entities/tournament';
import { useMyTeamInTournament, useLastSubmission } from '@entities/team';
import { TrophyIcon, FileTrayFullIcon, ClipboardIcon } from '@shared/ui/icons';
import { DeadlineBadge, RoundBadge } from '@shared/ui/badges';
import { NavigationSkeleton } from '../../NavigationSkeleton/NavigationSkeleton';
import styles from './ParticipantRoleView.module.css';

interface ParticipantRoleViewProps {
  tournament: TournamentDomain;
}

/**
 * Detail view for the "participant" role.
 * Shows: team name, current round with deadline, last submission with round index.
 */
export const ParticipantRoleView = ({ tournament }: ParticipantRoleViewProps) => {
  const { data: activeRound, isLoading: isLoadingRound } = useActiveRound(tournament.id);
  const { data: myTeam }     = useMyTeamInTournament(tournament.id);
  const { data: lastSubmit } = useLastSubmission(myTeam?.id);

  if (isLoadingRound) return <NavigationSkeleton />;

  const submitTitle = lastSubmit
    ? `Рішення — ${activeRound?.title ?? 'раунду'}`
    : '—';

  return (
    <div className={styles.content}>
      <ParticipantStatusRow
        icon={TrophyIcon}
        iconBgVariant="yellow"
        subtitle="Команда"
        title={myTeam?.name ?? 'Без команди'}
      />
      <ParticipantStatusRow
        icon={FileTrayFullIcon}
        iconBgVariant="green"
        subtitle="Поточний раунд"
        title={activeRound?.title ?? '—'}
        rightSlot={activeRound ? <DeadlineBadge deadline={activeRound.deadline} /> : null}
      />
      <ParticipantStatusRow
        icon={ClipboardIcon}
        iconBgVariant="blue"
        subtitle="Останній сабміт"
        title={submitTitle}
        rightSlot={activeRound ? <RoundBadge orderIndex={activeRound.orderIndex} /> : null}
      />
    </div>
  );
};

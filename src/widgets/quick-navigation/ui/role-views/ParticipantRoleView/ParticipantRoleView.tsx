import { useLastSubmission, useMyTeamInTournament } from '@entities/team';
import { ParticipantStatusRow, type TournamentDomain, useActiveRound } from '@entities/tournament';
import { DeadlineBadge, RoundBadge } from '@shared/ui/badges';
import { ClipboardIcon, FileTrayFullIcon, TrophyIcon } from '@shared/ui/icons';
import { useNavigate } from 'react-router-dom';
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
  const { data: myTeam } = useMyTeamInTournament(tournament.id);
  const { data: lastSubmit } = useLastSubmission(myTeam?.id);
  const navigate = useNavigate();

  if (isLoadingRound) return <NavigationSkeleton />;

  const submitTitle = lastSubmit ? `Рішення — ${activeRound?.title ?? 'раунду'}` : '—';

  const handleRoundClick = () => {
    if (activeRound) {
      navigate(`/tournaments/${tournament.id}/tournamentDetails/${activeRound.id}`);
    }
  };

  const handleSubmitClick = () => {
    if (activeRound) {
      navigate(`/tournaments/${tournament.id}/tournamentDetails/${activeRound.id}/submit`);
    }
  };

  return (
    <div className={styles.content}>
      <ParticipantStatusRow
        icon={TrophyIcon}
        iconBgVariant='yellow'
        subtitle='Команда'
        title={myTeam?.name ?? 'Без команди'}
      />
      <ParticipantStatusRow
        icon={FileTrayFullIcon}
        iconBgVariant='green'
        subtitle='Поточний раунд'
        title={activeRound?.title ?? '—'}
        rightSlot={activeRound ? <DeadlineBadge deadline={activeRound.deadline} /> : null}
        onClick={handleRoundClick}
      />
      <ParticipantStatusRow
        icon={ClipboardIcon}
        iconBgVariant='blue'
        subtitle='Останній сабміт'
        title={submitTitle}
        rightSlot={activeRound ? <RoundBadge orderIndex={activeRound.orderIndex} /> : null}
        onClick={handleSubmitClick}
      />
    </div>
  );
};

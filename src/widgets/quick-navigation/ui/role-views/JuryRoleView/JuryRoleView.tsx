import {
  ParticipantStatusRow,
  type TournamentDomain,
  useActiveRound,
  useJuryEvaluationsCount,
} from '@entities/tournament';
import { useSubmissionFilterStore } from '@features/submission-filter';
import { DeadlineBadge, RoundBadge } from '@shared/ui/badges';
import { ClipboardIcon, TimeIcon } from '@shared/ui/icons';
import { useNavigate } from 'react-router-dom';
import { NavigationSkeleton } from '../../NavigationSkeleton/NavigationSkeleton';
import styles from './JuryRoleView.module.css';

interface JuryRoleViewProps {
  tournament: TournamentDomain;
}

/**
 * Detail view for the "jury" role.
 * Shows: current round with deadline, pending submissions count.
 */
export const JuryRoleView = ({ tournament }: JuryRoleViewProps) => {
  const { data: activeRound, isLoading: loadingRound } = useActiveRound(tournament.id);
  const { data: evaluationsCount, isLoading: loadingEvals } = useJuryEvaluationsCount(
    tournament.id,
  );
  const navigate = useNavigate();
  const { setTournamentId, setRoundId } = useSubmissionFilterStore();

  if (loadingRound || loadingEvals) return <NavigationSkeleton />;

  const handleRoundClick = () => {
    if (activeRound) {
      setTournamentId(tournament.id.toString());
      setRoundId(activeRound.id.toString());
      navigate('/jury/submissions');
    }
  };

  return (
    <div className={styles.content}>
      <ParticipantStatusRow
        icon={ClipboardIcon}
        iconBgVariant='green'
        subtitle='Поточний раунд'
        title={activeRound?.title ?? '—'}
        rightSlot={activeRound ? <DeadlineBadge deadline={activeRound.deadline} /> : null}
        onClick={handleRoundClick}
      />
      <ParticipantStatusRow
        icon={TimeIcon}
        iconBgVariant='blue'
        subtitle='Сабміти на перевірку'
        title={String(evaluationsCount?.count ?? 0)}
        rightSlot={activeRound ? <RoundBadge orderIndex={activeRound.orderIndex} /> : null}
      />
    </div>
  );
};

import { useQuery } from '@tanstack/react-query';
import { BriefcaseIcon, ClipboardIcon, TimeIcon } from '@shared/ui/icons';
import { StatusBadge } from '@shared/ui/badges';
import { ParticipantStatusRow, useActiveRound, tournamentApi, type TournamentDomain } from '@entities/tournament';
import { WidgetSkeleton } from '../WidgetSkeleton';
import styles from '../ParticipantStatusWidget.module.css';

interface JuryViewProps {
  tournament: TournamentDomain;
}

export const JuryView = ({ tournament }: JuryViewProps) => {
  const { data: activeRound, isLoading: isLoadingRound } = useActiveRound(tournament.id);
  
  const { data: submissions, isLoading: isLoadingSubmits } = useQuery({
    queryKey: ['round-submissions', tournament.id, activeRound?.id],
    queryFn: () => tournamentApi.getRoundSubmissions(tournament.id, activeRound!.id),
    enabled: !!activeRound?.id,
  });

  if (isLoadingRound || isLoadingSubmits) return <WidgetSkeleton />;

  const pendingCount = submissions?.filter(s => s.status === 'SB').length || 0;

  return (
    <div className={styles.content}>
      <ParticipantStatusRow
        icon={BriefcaseIcon}
        iconBgVariant="blue"
        subtitle="Роль"
        title="Член журі"
      />
      <ParticipantStatusRow
        icon={ClipboardIcon}
        iconBgVariant="yellow"
        subtitle="Поточний раунд"
        title={activeRound?.title || 'Оцінювання'}
        rightSlot={activeRound ? <StatusBadge variant="yellow">Активний</StatusBadge> : null}
      />
      <ParticipantStatusRow
        icon={TimeIcon}
        iconBgVariant="green"
        subtitle="На оцінку"
        title={`${pendingCount} сабмітів`}
      />
    </div>
  );
};

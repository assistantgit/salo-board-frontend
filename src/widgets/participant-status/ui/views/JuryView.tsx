import { BriefcaseIcon, ClipboardIcon, TimeIcon, TrophyIcon } from '@shared/ui/icons';
import { ParticipantStatusRow, useActiveRound, type TournamentDomain } from '@entities/tournament';
import { WidgetSkeleton } from '../WidgetSkeleton';
import styles from '../ParticipantStatusWidget.module.css';

interface JuryViewProps {
  tournament: TournamentDomain;
}

export const JuryView = ({ tournament }: JuryViewProps) => {
  const { data: activeRound, isLoading: isLoadingRound } = useActiveRound(tournament.id);

  if (isLoadingRound) return <WidgetSkeleton />;

  return (
    <div className={styles.content}>
      <ParticipantStatusRow
        icon={TrophyIcon}
        iconBgVariant="yellow"
        subtitle="Кількість команд"
        title={String(tournament.teamsCount || 0)}
      />
      <ParticipantStatusRow
        icon={ClipboardIcon}
        iconBgVariant="green"
        subtitle="Поточний раунд"
        title={activeRound?.title || 'Відбір мандарин'}
      />
      <ParticipantStatusRow
        icon={TimeIcon}
        iconBgVariant="blue"
        subtitle="Сабміти на перевірку"
        title="треба реалізувати"
      />
    </div>
  );
};

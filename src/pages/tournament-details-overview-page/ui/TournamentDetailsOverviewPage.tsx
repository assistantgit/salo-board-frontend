import { BGLayout } from '@widgets/bg-layout';
import { CriteriaWeightList } from '@widgets/criteria-weight-list';
import { PerformanceChart } from '@widgets/performance-chart';
import { RoundsTimeline } from '@widgets/rounds-timeline';
import { TournamentDetailsHero } from '@widgets/tournament-details-hero';
import { useParams } from 'react-router-dom';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import styles from './TournamentDetailsOverviewPage.module.css';

export function TournamentDetailsOverviewPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;
  const tournamentId = Number(id);

  return (
    <BGLayout bgConfig={BG_LAYOUT_CONFIG}>
      <div className={styles.page}>
        <TournamentDetailsHero tournamentId={tournamentId} />
        <RoundsTimeline tournamentId={tournamentId} />
        <PerformanceChart tournamentId={tournamentId} />
        <CriteriaWeightList tournamentId={tournamentId} />
      </div>
    </BGLayout>
  );
}

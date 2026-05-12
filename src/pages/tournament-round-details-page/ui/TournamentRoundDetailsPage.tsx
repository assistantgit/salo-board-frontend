import { BGLayout } from '@widgets/bg-layout';
import { CategoryResultsChart } from '@widgets/category-results-chart';
import { RoundCriteriaResults } from '@widgets/round-criteria-results';
import { RoundDescription } from '@widgets/round-description';
import { RoundHeader } from '@widgets/round-header';
import { RoundInfoCards } from '@widgets/round-info-cards';
import { useParams } from 'react-router-dom';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import styles from './TournamentRoundDetailsPage.module.css';

export function TournamentRoundDetailsPage() {
  const { id, roundId } = useParams<{ id: string; roundId: string }>();

  if (!id || !roundId) return null;

  const tournamentId = Number(id);
  const rId = Number(roundId);

  return (
    <BGLayout bgConfig={BG_LAYOUT_CONFIG}>
      <div className={styles.page}>
        <RoundHeader tournamentId={tournamentId} roundId={rId} />
        <RoundInfoCards tournamentId={tournamentId} roundId={rId} />
        <RoundDescription tournamentId={tournamentId} roundId={rId} />
        <CategoryResultsChart tournamentId={tournamentId} roundId={rId} />
        <RoundCriteriaResults tournamentId={tournamentId} roundId={rId} />
      </div>
    </BGLayout>
  );
}

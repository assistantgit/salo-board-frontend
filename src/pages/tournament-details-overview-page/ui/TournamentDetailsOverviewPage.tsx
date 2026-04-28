import { CriteriaWeightList } from '@widgets/criteria-weight-list';
import { PerformanceChart } from '@widgets/performance-chart';
import { useParams } from 'react-router-dom';
import { TournamentDetailsHeader } from './components/TournamentDetailsHeader';
import styles from './TournamentDetailsOverviewPage.module.css';

export function TournamentDetailsOverviewPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <div className={styles.page}>
      <TournamentDetailsHeader />
      <PerformanceChart tournamentId={id} />
      <CriteriaWeightList tournamentId={id} />
    </div>
  );
}

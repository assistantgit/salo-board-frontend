import { useCurrentTournament, mapTournamentToKeyDates } from "@entities/tournament";
import { TournamentKeyDatesSkeleton } from './TournamentKeyDatesSkeleton';
import { TournamentKeyDatesList } from './TournamentKeyDatesList';
import styles from './TournamentKeyDates.module.css';

export function TournamentKeyDates() {
  const { tournament, isLoading } = useCurrentTournament();

  if (isLoading) return <TournamentKeyDatesSkeleton />;
  if (!tournament) return null;

  const items = mapTournamentToKeyDates(tournament);

  return (
    <aside className={styles.card}>
      {/* Header: title + full-width divider */}
      <div className={styles.header}>
        <h2 className={styles.title}>Ключові дати</h2>
      </div>
      <div className={styles.headerDivider} />

      {/* Date rows */}
      <TournamentKeyDatesList items={items} />
    </aside>
  );
}

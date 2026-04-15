import { TournamentHero } from "@widgets/tournament-hero";
import styles from './TournamentPageColumns.module.css';
import { useCurrentTournament } from "@entities/tournament";
import { TournamentKeyDates } from "@widgets/tournament-key-dates";
import { TournamentOrganizers } from "@widgets/tournament-organizers";
import { TournamentTeams } from "@widgets/tournament-teams";
import { TournamentDescription } from "@widgets/tournament-description";
import { TournamentRules } from "@widgets/tournament-rules";
import { TournamentPageSkeleton } from "./TournamentPageSkeleton";
import { TournamentPageError } from "./TournamentPageError";

/**
 * TournamentPageBody — Main content for the tournament page.
 */
export function TournamentPageBody() {
  const { tournament, isLoading, error } = useCurrentTournament();

  if (isLoading) return <TournamentPageSkeleton />;

  if (error || !tournament) {
    return <TournamentPageError message={error || 'Турнір не знайдено'} />;
  }

  return (
    <>
      <TournamentHero />

      <div className={styles.bodyLayout}>
        <div className={styles.leftCol}>
          <TournamentDescription />
          <TournamentRules />
          <TournamentOrganizers />
        </div>

        <div className={styles.rightCol}>
          <TournamentKeyDates />
          <TournamentTeams />
        </div>
      </div>
    </>
  );
}

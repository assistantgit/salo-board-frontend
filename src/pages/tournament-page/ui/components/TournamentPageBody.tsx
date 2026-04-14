import { TournamentHero } from "@widgets/tournament-hero";
import styles from './TournamentPageColumns.module.css';
import { type TournamentDomain, type KeyDateItem, TournamentDescription, TournamentRules } from "@entities/tournament";
import { TournamentKeyDates } from "@widgets/tournament-key-dates";

interface TournamentPageBodyProps {
  tournament: TournamentDomain;
  keyDates: KeyDateItem[];
}

/**
 * TournamentPageBody — Main content for the tournament page.
 */
export function TournamentPageBody({ tournament, keyDates }: TournamentPageBodyProps) {
  return (
    <>
      <TournamentHero
        status={tournament.status}
        title={tournament.title}
        startDate={tournament.startDate.toISOString()}
        regCloseAt={tournament.regCloseAt.toISOString()}
        minTeamSize={tournament.minTeamSize ?? 1}
        maxTeamSize={tournament.maxTeamSize ?? 5}
        maxTeam={tournament.maxTeam ?? 16}
      />

      <div className={styles.bodyLayout}>
        <div className={styles.leftCol}>
          <TournamentDescription description={tournament.description} />
          <TournamentRules rules={tournament.rules} />
        </div>

        <div className={styles.rightCol}>
          <TournamentKeyDates items={keyDates} />
        </div>
      </div>
    </>
  );
}

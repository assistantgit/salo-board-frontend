import { TournamentHero } from "@widgets/tournament-hero";
import { DefaultButton } from "@shared/ui/buttons";
import styles from './TournamentPageColumns.module.css';
import { type TournamentDomain, type KeyDateItem, TournamentDescription, TournamentRules } from "@entities/tournament";
import { TournamentKeyDates } from "@widgets/tournament-key-dates";
import { TournamentOrganizers } from "@widgets/tournament-organizers";
import { TournamentTeams } from "@widgets/tournament-teams";

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
        actions={
          <>
            <DefaultButton className={styles.primaryButton}>Зареєструватися</DefaultButton>
            <DefaultButton className={styles.outlineButton}>Переглянути правила</DefaultButton>
          </>
        }
      />

      <div className={styles.bodyLayout}>
        <div className={styles.leftCol}>
          <TournamentDescription description={tournament.description} />
          <TournamentRules rules={tournament.rules} />
          <TournamentOrganizers
            organizers={[{ id: 1, fullName: tournament.organizer || "SaloBoard Team", role: "Організатор" }]}
            jury={[]}
          />
        </div>

        <div className={styles.rightCol}>
          <TournamentKeyDates items={keyDates} />
          <TournamentTeams tournament={tournament} />
        </div>
      </div>
    </>
  );
}

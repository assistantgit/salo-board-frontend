import React from 'react';
import styles from './TournamentHero.module.css';
import { useCurrentTournament } from '@entities/tournament';
import { HeroHeader } from './components/HeroHeader';
import { HeroStats } from './components/HeroStats';
import { JoinTournamentButton } from '@features/tournament-join';
import { ViewRulesButton } from '@features/tournament-rules';

/**
 * TournamentHero - Widget that displays main tournament information.
 * Uses internal context to fetch tournament data without props.
 */
export const TournamentHero: React.FC = () => {
  const { tournament } = useCurrentTournament();

  if (!tournament) return null;

  return (
    <div className={styles.heroContainer}>
      <HeroHeader status={tournament.status} title={tournament.title} />

      <div className={styles.divider} />

      <HeroStats
        startDate={tournament.startDate.toISOString()}
        regCloseAt={tournament.regCloseAt.toISOString()}
        minTeamSize={tournament.minTeamSize ?? 1}
        maxTeamSize={tournament.maxTeamSize ?? 5}
        maxTeam={tournament.maxTeam ?? 16}
      />

      <div className={styles.actions}>
        <JoinTournamentButton />
        <ViewRulesButton />
      </div>
    </div>
  )
}

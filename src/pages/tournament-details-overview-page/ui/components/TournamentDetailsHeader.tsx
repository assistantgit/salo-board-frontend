import { useMyTeamInTournament, useTeamSubmissions } from '@entities/team';
import { TournamentStatusBadge, useRounds, useTournament } from '@entities/tournament';
import type React from 'react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styles from './TournamentDetailsHeader.module.css';

export const TournamentDetailsHeader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tournamentId = id ? parseInt(id, 10) : undefined;

  const { tournament } = useTournament(tournamentId);
  const { rounds } = useRounds(tournamentId);
  const { data: myTeam } = useMyTeamInTournament(tournamentId);
  const { data: submissions } = useTeamSubmissions(myTeam?.id);

  const activeRound = useMemo(() => {
    return rounds.find((r) => r.status === 'AC');
  }, [rounds]);

  const canSubmit = useMemo(() => {
    if (!tournament || !activeRound) return false;
    if (tournament.status !== 'RN') return false; // Not running

    const deadline = new Date(activeRound.deadline);
    const now = new Date();

    // Check if deadline is in the future
    return deadline > now;
  }, [tournament, activeRound]);

  const activeRoundSubmission = useMemo(() => {
    if (!activeRound || !submissions) return null;
    return submissions.find((s) => s.round === activeRound.id);
  }, [activeRound, submissions]);

  if (!tournament) return null;

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.info}>
          <TournamentStatusBadge status={tournament.status} />
          <h1 className={styles.title}>{tournament.title}</h1>
        </div>

        {canSubmit && (
          <div className={styles.actions}>
            {!activeRoundSubmission ? (
              <button
                className={styles.submitButton}
                onClick={() => console.log('Відправити роботу')}
              >
                Відправити роботу
              </button>
            ) : (
              <button className={styles.editButton} onClick={() => console.log('Редагувати')}>
                Редагувати
              </button>
            )}
          </div>
        )}
      </div>

      <div className={styles.divider} />

      {tournament.description && <div className={styles.description}>{tournament.description}</div>}
    </div>
  );
};

import { SubmissionCard } from '@entities/submission';
import { useSubmissionFilterStore } from '@features/submission-filter';
import type React from 'react';
import { useEffect, useMemo } from 'react';

import { MOCK_SUBMISSIONS } from '../model/mock';
import { SubmissionFilters } from './SubmissionFilters';
import styles from './SubmissionList.module.css';

/**
 * Cleanly managed Submission List.
 * REDO from 0: focuses on data flow and using the new filter system.
 */
export const SubmissionList: React.FC = () => {
  const { search, status, tournamentId, roundId, setCount } = useSubmissionFilterStore();

  const filteredSubmissions = useMemo(() => {
    return MOCK_SUBMISSIONS.filter((s) => {
      const matchSearch =
        s.teamName.toLowerCase().includes(search.toLowerCase()) ||
        s.tournamentTitle.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === 'ALL' || s.status === status;
      const matchTournament = tournamentId === 'ALL' || s.tournamentTitle === tournamentId;
      const matchRound = roundId === 'ALL' || s.roundTitle === roundId;

      return matchSearch && matchStatus && matchTournament && matchRound;
    });
  }, [search, status, tournamentId, roundId]);

  useEffect(() => {
    setCount(filteredSubmissions.length);
  }, [filteredSubmissions.length, setCount]);

  const tournamentTitles = useMemo(() => {
    return Array.from(new Set(MOCK_SUBMISSIONS.map((s) => s.tournamentTitle)));
  }, []);

  const roundTitles = useMemo(() => {
    if (tournamentId === 'ALL') return [];
    return Array.from(
      new Set(
        MOCK_SUBMISSIONS.filter((s) => s.tournamentTitle === tournamentId).map((s) => s.roundTitle),
      ),
    );
  }, [tournamentId]);

  return (
    <div className={styles.container}>
      <SubmissionFilters tournamentTitles={tournamentTitles} roundTitles={roundTitles} />

      {filteredSubmissions.length === 0 ? (
        <div className={styles.empty}>
          <h3>Нічого не знайдено</h3>
          <p>Спробуйте змінити параметри пошуку або фільтрації</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredSubmissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))}
        </div>
      )}
    </div>
  );
};

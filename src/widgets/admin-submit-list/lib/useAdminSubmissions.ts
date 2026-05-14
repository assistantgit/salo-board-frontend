import type { Submission } from '@entities/submission';
import { tournamentApi, useTournaments } from '@entities/tournament';
import { useRounds } from '@entities/tournament/lib/hooks/useRounds';
import { useSubmissionFilterStore } from '@features/submission-filter';
import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

export const useAdminSubmissions = () => {
  const { search, status, tournamentId, roundId, setCount } = useSubmissionFilterStore();

  const { tournaments: adminTournaments } = useTournaments({ role: 'admin' });

  const selectedTournament = useMemo(
    () => adminTournaments.find((t) => t.id.toString() === tournamentId),
    [adminTournaments, tournamentId],
  );
  const tournamentTitle = selectedTournament?.title || '';

  const { rounds, isLoading: isRoundsLoading } = useRounds(
    tournamentId !== 'ALL' ? Number(tournamentId) : undefined,
    true,
  );

  const roundsToFetch = useMemo(() => {
    if (tournamentId === 'ALL') return [];
    if (roundId !== 'ALL') return rounds.filter((r) => r.id.toString() === roundId);
    return rounds;
  }, [tournamentId, roundId, rounds]);

  const submissionsQueries = useQueries({
    queries: roundsToFetch.map((round) => ({
      queryKey: ['tournament', tournamentId, 'round', round.id, 'submissions', 'admin'],
      queryFn: () => tournamentApi.getRoundSubmissions(Number(tournamentId), round.id),
      enabled: !!tournamentId && tournamentId !== 'ALL',
    })),
  });

  const { data: evaluations, isLoading: isEvaluationsLoading } = useQuery({
    queryKey: ['tournament', tournamentId, 'evaluations', 'admin'],
    queryFn: () => tournamentApi.getJuryEvaluations(Number(tournamentId)),
    enabled: !!tournamentId && tournamentId !== 'ALL',
    placeholderData: keepPreviousData,
  });

  const isLoading =
    isRoundsLoading || isEvaluationsLoading || submissionsQueries.some((q) => q.isLoading);

  const submissionsList = useMemo(() => {
    if (tournamentId === 'ALL') return [];

    const list: Submission[] = [];
    submissionsQueries.forEach((q, index) => {
      const round = roundsToFetch[index];
      const subs = q.data || [];
      subs.forEach((sub) => {
        const evalForSub = evaluations?.find((e) => e.submission === sub.id);

        let evalStatus: 'UNRATED' | 'DRAFT' | 'RATED' = 'UNRATED';
        if (evalForSub) {
          evalStatus = evalForSub.status === 'SB' ? 'RATED' : 'DRAFT';
        }

        list.push({
          id: sub.id,
          tournamentId: Number(tournamentId),
          roundId: round.id,
          tournamentTitle: tournamentTitle,
          roundTitle: round.title,
          teamName: sub.teamName,
          status: evalStatus,
          lastModified: sub.submittedAt || sub.createdAt || new Date().toISOString(),
        });
      });
    });

    return list;
  }, [tournamentId, roundsToFetch, submissionsQueries, evaluations, tournamentTitle]);

  const filteredSubmissions = useMemo(() => {
    return submissionsList.filter((s) => {
      const matchSearch =
        s.teamName.toLowerCase().includes(search.toLowerCase()) ||
        s.tournamentTitle.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === 'ALL' || s.status === status;
      return matchSearch && matchStatus;
    });
  }, [submissionsList, search, status]);

  useEffect(() => {
    if (!isLoading) {
      setCount(filteredSubmissions.length);
    }
    if (isLoading) {
      setCount(-1);
    }
  }, [filteredSubmissions.length, isLoading, setCount]);

  const tournamentOptions = useMemo(() => {
    return adminTournaments.map((t) => ({ id: t.id.toString(), title: t.title }));
  }, [adminTournaments]);

  const roundOptions = useMemo(() => {
    return rounds.map((r) => ({ id: r.id.toString(), title: r.title }));
  }, [rounds]);

  return {
    submissions: filteredSubmissions,
    isLoading,
    tournaments: tournamentOptions,
    rounds: roundOptions,
    tournamentId,
  };
};

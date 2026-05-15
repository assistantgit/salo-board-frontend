import type { Submission } from '@entities/submission';
import { tournamentApi, useRounds } from '@entities/tournament';
import { useUserTournaments } from '@entities/user';
import { useSubmissionFilterStore } from '@features/submission-filter';
import { useDebounce } from '@shared/lib';
import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

export const useJurySubmissions = () => {
  const search = useSubmissionFilterStore((s) => s.search);
  const status = useSubmissionFilterStore((s) => s.status);
  const tournamentId = useSubmissionFilterStore((s) => s.tournamentId);
  const roundId = useSubmissionFilterStore((s) => s.roundId);
  const setCount = useSubmissionFilterStore((s) => s.setCount);

  // Source for the filters dropdown - use history to get ALL jury tournaments
  const { tournaments: historyTournaments } = useUserTournaments();
  const juryTournaments = useMemo(
    () => historyTournaments.filter((t) => t.role === 'jury'),
    [historyTournaments],
  );

  const selectedTournament = useMemo(
    () => juryTournaments.find((t) => t.id.toString() === tournamentId),
    [juryTournaments, tournamentId],
  );
  const tournamentTitle = selectedTournament?.title || '';

  const { rounds, isLoading: isRoundsLoading } = useRounds(
    tournamentId !== 'ALL' ? Number(tournamentId) : 0,
    true,
  );

  const roundsToFetch = useMemo(() => {
    if (tournamentId === 'ALL') return [];
    if (roundId !== 'ALL') return rounds.filter((r) => r.id.toString() === roundId);
    return rounds;
  }, [tournamentId, roundId, rounds]);

  const submissionsQueries = useQueries({
    queries: roundsToFetch.map((round) => ({
      queryKey: ['tournament', tournamentId, 'round', round.id, 'submissions'],
      queryFn: () => tournamentApi.getRoundSubmissions(Number(tournamentId), round.id),
      enabled: !!tournamentId && tournamentId !== 'ALL',
      staleTime: 1000 * 60 * 5,
    })),
  });

  const { data: evaluations, isLoading: isEvaluationsLoading } = useQuery({
    queryKey: ['tournament', tournamentId, 'jury-evaluations'],
    queryFn: () => tournamentApi.getJuryEvaluations(Number(tournamentId)),
    enabled: !!tournamentId && tournamentId !== 'ALL',
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
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

  const debouncedSearch = useDebounce(search, 300);

  const filteredSubmissions = useMemo(() => {
    return submissionsList.filter((s) => {
      const matchSearch =
        s.teamName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        s.tournamentTitle.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchStatus = status === 'ALL' || s.status === status;
      return matchSearch && matchStatus;
    });
  }, [submissionsList, debouncedSearch, status]);

  useEffect(() => {
    if (!isLoading) {
      setCount(filteredSubmissions.length);
    }
    if (isLoading) {
      setCount(-1);
    }
  }, [filteredSubmissions.length, isLoading, setCount]);

  const tournamentOptions = useMemo(() => {
    return juryTournaments.map((t) => ({ id: t.id.toString(), title: t.title }));
  }, [juryTournaments]);

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

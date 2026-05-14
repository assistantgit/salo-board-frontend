import { tournamentApi, useTournaments } from '@entities/tournament';
import { useRounds } from '@entities/tournament/lib/hooks/useRounds';
import { useSubmissionFilterStore } from '@features/submission-filter';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

export const useAdminEvaluations = () => {
  const { search, status, tournamentId, roundId, setCount } = useSubmissionFilterStore();

  const { tournaments: adminTournaments } = useTournaments({ role: 'admin' });

  const { rounds, isLoading: isRoundsLoading } = useRounds(
    tournamentId !== 'ALL' ? Number(tournamentId) : undefined,
    true,
  );

  const { data: evaluations = [], isLoading: isEvaluationsLoading } = useQuery({
    queryKey: ['tournament', tournamentId, 'round', roundId, 'evaluations', 'admin-list'],
    queryFn: () => tournamentApi.getAdminRoundEvaluations(Number(tournamentId), Number(roundId)),
    enabled: tournamentId !== 'ALL' && roundId !== 'ALL',
    placeholderData: keepPreviousData,
  });

  const isLoading = isRoundsLoading || isEvaluationsLoading;

  const filteredEvaluations = useMemo(() => {
    return evaluations.filter((e) => {
      const fullName = `${e.juryFirstName || ''} ${e.juryLastName || ''}`.toLowerCase();
      const matchSearch = fullName.includes(search.toLowerCase());

      const statusMap: Record<string, string> = {
        DRAFT: 'DR',
        RATED: 'SB',
      };

      const matchStatus =
        status === 'ALL' || (status in statusMap && e.status === statusMap[status]);
      return matchSearch && matchStatus;
    });
  }, [evaluations, search, status]);

  useEffect(() => {
    if (!isLoading) {
      setCount(filteredEvaluations.length);
    }
    if (isLoading) {
      setCount(-1);
    }
  }, [filteredEvaluations.length, isLoading, setCount]);

  const tournamentOptions = useMemo(() => {
    return adminTournaments.map((t) => ({ id: t.id.toString(), title: t.title }));
  }, [adminTournaments]);

  const roundOptions = useMemo(() => {
    return rounds.map((r) => ({ id: r.id.toString(), title: r.title }));
  }, [rounds]);

  return {
    evaluations: filteredEvaluations,
    isLoading,
    tournaments: tournamentOptions,
    rounds: roundOptions,
    tournamentId,
    roundId,
  };
};

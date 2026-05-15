import { tournamentApi, useTournaments } from '@entities/tournament';
import { useRounds } from '@entities/tournament/lib/hooks/useRounds';
import { formatFullName } from '@entities/user/lib/formatFullName';
import { useSubmissionFilterStore } from '@features/submission-filter';
import { useDebounce } from '@shared/lib';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

export const useAdminEvaluations = () => {
  const search = useSubmissionFilterStore((s) => s.search);
  const status = useSubmissionFilterStore((s) => s.status);
  const tournamentId = useSubmissionFilterStore((s) => s.tournamentId);
  const roundId = useSubmissionFilterStore((s) => s.roundId);
  const setCount = useSubmissionFilterStore((s) => s.setCount);

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
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = isRoundsLoading || isEvaluationsLoading;

  const debouncedSearch = useDebounce(search, 300);

  const filteredEvaluations = useMemo(() => {
    return evaluations.filter((e) => {
      const fullName = formatFullName(e.juryFirstName, e.juryLastName).toLowerCase();
      const matchSearch = fullName.includes(debouncedSearch.toLowerCase());

      const statusMap: Record<string, string> = {
        DRAFT: 'DR',
        RATED: 'SB',
      };

      const matchStatus =
        status === 'ALL' || (status in statusMap && e.status === statusMap[status]);
      return matchSearch && matchStatus;
    });
  }, [evaluations, debouncedSearch, status]);

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

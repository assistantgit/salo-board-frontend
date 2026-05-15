import { useRounds, useTournaments } from '@entities/tournament';
import { useUserTournaments } from '@entities/user';
import { useTournamentFilterStore } from '@features/tournament-filter';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useJuryTournaments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | undefined>(
    searchParams.get('tournamentId') || 'ALL',
  );
  const [selectedRoundId, setSelectedRoundId] = useState<string | undefined>(
    searchParams.get('roundId') || 'ALL',
  );

  const search = useTournamentFilterStore((s) => s.search);
  const statusTab = useTournamentFilterStore((s) => s.status);
  const setCount = useTournamentFilterStore((s) => s.setCount);

  // Source for the filters dropdown - use history to get ALL jury tournaments
  const { tournaments: historyTournaments } = useUserTournaments();
  const juryTournaments = useMemo(
    () => historyTournaments.filter((t) => t.role === 'jury'),
    [historyTournaments],
  );

  const {
    tournaments,
    isLoading: isListLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error: listError,
  } = useTournaments({
    role: 'jury',
    status: statusTab === 'ALL' ? undefined : statusTab,
    name: search || undefined,
  });

  const { rounds } = useRounds(
    selectedTournamentId && selectedTournamentId !== 'ALL' ? Number(selectedTournamentId) : 0,
  );

  useEffect(() => {
    if (selectedTournamentId === 'ALL' || !selectedTournamentId) {
      setSelectedRoundId('ALL');
    }
  }, [selectedTournamentId]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedTournamentId && selectedTournamentId !== 'ALL') {
      params.set('tournamentId', selectedTournamentId);
    } else {
      params.delete('tournamentId');
    }
    if (selectedRoundId && selectedRoundId !== 'ALL') {
      params.set('roundId', selectedRoundId);
    } else {
      params.delete('roundId');
    }
    setSearchParams(params, { replace: true });
  }, [selectedTournamentId, selectedRoundId, searchParams, setSearchParams]);

  const filteredTournaments = useMemo(() => {
    let result = tournaments;

    if (selectedTournamentId && selectedTournamentId !== 'ALL') {
      result = result.filter((t) => t.id.toString() === selectedTournamentId);
    }

    return result;
  }, [tournaments, selectedTournamentId]);

  useEffect(() => {
    if (!isListLoading && !listError) {
      setCount(filteredTournaments.length);
    }
    if (isListLoading) {
      setCount(-1);
    }
  }, [filteredTournaments.length, isListLoading, listError, setCount]);

  return {
    tournaments: filteredTournaments,
    juryTournaments,
    rounds,
    selectedTournamentId,
    setSelectedTournamentId,
    selectedRoundId,
    setSelectedRoundId,
    isLoading: isListLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error: listError,
  };
};

import { useMyTournamentsByRole, useRounds, useTournaments } from '@entities/tournament';
import { useTournamentFilterStore } from '@features/tournament-filter';
import { useEffect, useMemo, useState } from 'react';

export const useJuryTournaments = () => {
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | undefined>('ALL');
  const [selectedRoundId, setSelectedRoundId] = useState<string | undefined>('ALL');

  const search = useTournamentFilterStore((s) => s.search);
  const statusTab = useTournamentFilterStore((s) => s.status);
  const setCount = useTournamentFilterStore((s) => s.setCount);

  const {
    tournaments,
    isLoading: isListLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error: listError,
  } = useTournaments({
    role: 'jury',
    status: statusTab === 'ALL' ? 'RN' : statusTab,
    name: search || undefined,
  });

  const { tournaments: juryTournaments } = useMyTournamentsByRole('jury');

  const { rounds } = useRounds(
    selectedTournamentId && selectedTournamentId !== 'ALL' ? Number(selectedTournamentId) : 0,
  );

  useEffect(() => {
    if (selectedTournamentId === 'ALL' || !selectedTournamentId) {
      setSelectedRoundId('ALL');
    }
  }, [selectedTournamentId]);

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

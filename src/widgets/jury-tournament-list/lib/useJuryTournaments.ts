import {
  MOCK_ROUNDS,
  MOCK_TOURNAMENTS,
  useMyTournamentsByRole,
  useRounds,
  useTournaments,
} from '@entities/tournament';
import { useTournamentFilterStore } from '@features/tournament-filter';
import { useEffect, useMemo, useState } from 'react';

const USE_MOCKS = true; // Set to true for visual verification

export const useJuryTournaments = () => {
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | undefined>('ALL');
  const [selectedRoundId, setSelectedRoundId] = useState<string | undefined>('ALL');

  const search = useTournamentFilterStore((s) => s.search);
  const statusTab = useTournamentFilterStore((s) => s.status);
  const setCount = useTournamentFilterStore((s) => s.setCount);

  const {
    tournaments: realTournaments,
    isLoading: isListLoading,
    error: listError,
  } = useTournaments({
    role: 'jury',
    status: statusTab === 'ALL' ? 'RN' : statusTab,
    name: search || undefined,
  });

  const { tournaments: myTournamentsList } = useMyTournamentsByRole('jury');

  const tournaments = useMemo(() => {
    return USE_MOCKS || realTournaments.length === 0 ? MOCK_TOURNAMENTS : realTournaments;
  }, [realTournaments]);

  const juryTournaments =
    USE_MOCKS || myTournamentsList.length === 0 ? MOCK_TOURNAMENTS : myTournamentsList;

  const { rounds: realRounds } = useRounds(
    selectedTournamentId && selectedTournamentId !== 'ALL' ? Number(selectedTournamentId) : 0,
  );

  const rounds = useMemo(() => {
    if (USE_MOCKS && selectedTournamentId && selectedTournamentId !== 'ALL') {
      return MOCK_ROUNDS[Number(selectedTournamentId)] || [];
    }
    return realRounds;
  }, [realRounds, selectedTournamentId]);

  useEffect(() => {
    if (selectedTournamentId === 'ALL' || !selectedTournamentId) {
      setSelectedRoundId('ALL');
    }
  }, [selectedTournamentId]);

  const filteredTournaments = useMemo(() => {
    let result = tournaments;

    if (search) {
      result = result.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (statusTab !== 'ALL') {
      result = result.filter((t) => t.status === statusTab);
    }

    if (selectedTournamentId && selectedTournamentId !== 'ALL') {
      result = result.filter((t) => t.id.toString() === selectedTournamentId);
    }

    return result;
  }, [tournaments, search, statusTab, selectedTournamentId]);

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
    isLoading: isListLoading && !USE_MOCKS,
    error: listError,
    useMocks: USE_MOCKS,
  };
};

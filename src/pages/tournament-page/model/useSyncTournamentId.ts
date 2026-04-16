import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTournamentStore } from '@entities/tournament';

export function useSyncTournamentId() {
  const { id } = useParams();
  const setCurrentTournamentId = useTournamentStore((s) => s.setCurrentTournamentId);

  useEffect(() => {
    setCurrentTournamentId(id ? parseInt(id, 10) : null);
    return () => setCurrentTournamentId(null);
  }, [id, setCurrentTournamentId]);
}

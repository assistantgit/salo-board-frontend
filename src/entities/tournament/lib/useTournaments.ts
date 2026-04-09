import { useEffect, useState } from 'react';
import { tournamentApi } from '../api/tournament.api';
import type { TournamentDomain } from '../model/tournament.types';
import type { TournamentFilters } from '../api/types';

/**
 * Hook for fetching and managing tournament list.
 */
export function useTournaments(filters: TournamentFilters = {}) {
  const [tournaments, setTournaments] = useState<TournamentDomain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setIsLoading(true);
        const data = await tournamentApi.getTournaments(filters);
        setTournaments(data);
        setError(null);
      } catch (err) {
        setError('Помилка при завантаженні турнірів. Спробуйте пізніше.');
        console.error('Failed to fetch tournaments:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournaments();
  }, [JSON.stringify(filters)]);

  return { tournaments, isLoading, error };
}

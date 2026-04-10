import { useEffect, useState } from 'react';
import { tournamentApi } from '../api/tournament.api';
import type { TournamentDomain } from '../model/tournament.types';
import type { TournamentFilters } from '../api/types';

/**
 * Hook for fetching and managing tournament list.
 * Accepts individual filter primitives as deps to avoid JSON.stringify anti-pattern.
 * Re-fetches only when `name` or `status` actually changes value.
 */
export function useTournaments(filters: TournamentFilters = {}) {
  const [tournaments, setTournaments] = useState<TournamentDomain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Destructure to primitives so useEffect dep array is stable and lint-safe.
  // A new filters object reference on each render won't cause unnecessary fetches.
  const { name, status } = filters;

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setIsLoading(true);
        const data = await tournamentApi.getTournaments({ name, status });
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
  }, [name, status]); // ✅ primitive deps — no JSON.stringify anti-pattern

  return { tournaments, isLoading, error };
}

import { useEffect, useState } from 'react';
import { teamApi } from '../api/team.api';
import type { TeamDomain } from '../model/team.types';

interface UseTeamsByTournamentResult {
  teams: TeamDomain[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch teams for a specific tournament.
 */
// TODO: Replace with React Query once query client is configured globally
export function useTeamsByTournament(tournamentId: number | null): UseTeamsByTournamentResult {
  const [teams, setTeams] = useState<TeamDomain[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!tournamentId) {
      setTeams([]);
      return;
    }

    let isMounted = true;

    const loadTeams = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await teamApi.getTeamsByTournamentId(tournamentId);
        if (isMounted) {
          setTeams(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load teams'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, [tournamentId]);

  return { teams, isLoading, error };
}

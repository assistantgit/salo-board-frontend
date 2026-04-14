import { useQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';

/**
 * Returns the count of currently active (running) tournaments.
 * Active = status 'RN' (Running) or 'RG' (Registration open).
 * Uses React Query for state management.
 */
export function useActiveTournamentsCount(): number {
  const { data } = useQuery<number, Error>({
    queryKey: ['tournaments', 'active-count'],
    queryFn: async () => {
      const [running, registering] = await Promise.all([
        tournamentApi.getTournaments({ status: 'RN' }),
        tournamentApi.getTournaments({ status: 'RG' }),
      ]);
      return running.length + registering.length;
    },
    retry: 1,
    initialData: -1,
  });

  return data ?? 0;
}

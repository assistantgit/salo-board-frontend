import { useEffect, useState } from 'react';
import { tournamentApi } from '../api/tournament.api';

/**
 * Returns the count of currently active (running) tournaments.
 * Active = status 'RN' (Running) or 'RG' (Registration open).
 * Returns -1 while loading, 0 if none found.
 */
export function useActiveTournamentsCount(): number {
  const [count, setCount] = useState(-1);

  useEffect(() => {
    let cancelled = false;
    const fetchCount = async () => {
      try {
        // Fetch running tournaments
        const [running, registering] = await Promise.all([
          tournamentApi.getTournaments({ status: 'RN' }),
          tournamentApi.getTournaments({ status: 'RG' }),
        ]);
        if (!cancelled) {
          setCount(running.length + registering.length);
        }
      } catch {
        if (!cancelled) setCount(0);
      }
    };
    fetchCount();
    return () => { cancelled = true; };
  }, []);

  return count;
}

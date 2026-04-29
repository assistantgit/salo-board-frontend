import { useTournamentStore } from '../model/store';
import { useTournament } from './useTournament';

/**
 * Hook for fetching and managing the current tournament details based on the global store.
 * Useful for widgets that need to read tournament data without requiring it via props.
 */
export function useCurrentTournament() {
  const currentTournamentId = useTournamentStore((s) => s.currentTournamentId);
  return useTournament(currentTournamentId);
}

import { useRounds } from './hooks/useRounds';

export const useActiveRound = (tournamentId: number | undefined) => {
  const { rounds, isLoading, error } = useRounds(tournamentId);
  const activeRound = rounds.find((r) => r.status === 'AC');

  return {
    data: activeRound,
    isLoading,
    error,
  };
};

import { useQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';

export const useTournamentAdmins = (tournamentId: number | null | undefined) => {
  return useQuery({
    queryKey: ['tournament-admins', tournamentId],
    queryFn: () => tournamentApi.getAdmins(tournamentId as number),
    enabled: !!tournamentId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useTournamentJury = (tournamentId: number | null | undefined) => {
  return useQuery({
    queryKey: ['tournament-jury', tournamentId],
    queryFn: () => tournamentApi.getJury(tournamentId as number),
    enabled: !!tournamentId,
    staleTime: 5 * 60 * 1000,
  });
};

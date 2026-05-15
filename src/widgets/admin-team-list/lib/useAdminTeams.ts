import { adminTeamApi } from '@entities/team';
import { tournamentApi } from '@entities/tournament';
import { useTeamFilterStore } from '@features/team-filter';
import { useDebounce } from '@shared/lib';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

export const useAdminTeams = () => {
  const queryClient = useQueryClient();
  const search = useTeamFilterStore((s) => s.search);
  const status = useTeamFilterStore((s) => s.status);
  const tournamentId = useTeamFilterStore((s) => s.tournamentId);
  const setCount = useTeamFilterStore((s) => s.setCount);

  // Fetch admin tournaments for the filter
  const { data: tournamentsData, isLoading: isTournamentsLoading } = useQuery({
    queryKey: ['admin', 'tournaments'],
    queryFn: () => tournamentApi.getAdminTournaments(),
  });

  const tournaments = useMemo(() => {
    return (tournamentsData?.results || []).map((t) => ({
      id: t.id.toString(),
      title: t.title,
    }));
  }, [tournamentsData]);

  // Fetch teams for the selected tournament
  const { data: teams = [], isLoading: isTeamsLoading } = useQuery({
    queryKey: ['admin', 'tournament', tournamentId, 'teams'],
    queryFn: () => adminTeamApi.getAdminTeams(Number(tournamentId)),
    enabled: !!tournamentId && tournamentId !== 'ALL',
  });

  const debouncedSearch = useDebounce(search, 300);

  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchSearch = team.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchStatus = status === 'ALL' || team.status === status;
      return matchSearch && matchStatus;
    });
  }, [teams, debouncedSearch, status]);

  useEffect(() => {
    setCount(filteredTeams.length);
  }, [filteredTeams.length, setCount]);

  // Mutations
  const disqualifyMutation = useMutation({
    mutationFn: (teamId: number) => adminTeamApi.disqualifyTeam(Number(tournamentId), teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'tournament', tournamentId, 'teams'] });
    },
  });

  const removeParticipantMutation = useMutation({
    mutationFn: ({ teamId, userId }: { teamId: number; userId: number }) =>
      adminTeamApi.removeParticipant(Number(tournamentId), teamId, userId),
    onSuccess: (_, { teamId }) => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'tournament', tournamentId, 'team', teamId, 'participants'],
      });
    },
  });

  const transferCaptainMutation = useMutation({
    mutationFn: ({ teamId, userId }: { teamId: number; userId: number }) =>
      adminTeamApi.transferCaptainStatus(Number(tournamentId), teamId, userId),
    onSuccess: (_, { teamId }) => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'tournament', tournamentId, 'team', teamId, 'participants'],
      });
    },
  });

  return {
    teams: filteredTeams,
    isLoading: isTournamentsLoading || isTeamsLoading,
    tournaments,
    tournamentId,
    disqualifyTeam: disqualifyMutation.mutate,
    isDisqualifying: disqualifyMutation.isPending,
    removeParticipant: removeParticipantMutation.mutate,
    transferCaptain: transferCaptainMutation.mutate,
  };
};

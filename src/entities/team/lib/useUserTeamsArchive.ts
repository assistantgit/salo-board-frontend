import { useQuery } from '@tanstack/react-query';
import { teamApi } from '../api/team.api';

export const USER_TEAMS_ARCHIVE_QUERY_KEY = 'user-teams-archive';

/**
 * Hook for fetching user's archived teams.
 */
export const useUserTeamsArchive = () => {
  return useQuery({
    queryKey: [USER_TEAMS_ARCHIVE_QUERY_KEY],
    queryFn: () => teamApi.getArchiveTeams(),
  });
};

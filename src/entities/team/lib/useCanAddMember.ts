import { useQuery } from '@tanstack/react-query';
import { teamApi } from '../api/team.api';

export const CAN_ADD_MEMBER_QUERY_KEY = (teamId?: number) => ['team-can-add-member', teamId];

export const useCanAddMember = (teamId: number | undefined) => {
  return useQuery<boolean>({
    queryKey: CAN_ADD_MEMBER_QUERY_KEY(teamId),
    queryFn: () => (teamId ? teamApi.canAddParticipant(teamId) : Promise.resolve(false)),
    enabled: !!teamId,
    staleTime: 1000 * 60, // 1 minute
  });
};

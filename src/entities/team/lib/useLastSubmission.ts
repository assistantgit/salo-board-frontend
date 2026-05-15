import { useAuthStore } from '@entities/user';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { teamApi } from '../api/team.api';
import type { SubmissionDto } from '../model/team.types';

export const useLastSubmission = (teamId: number | undefined) => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return useQuery({
    queryKey: ['team-submissions', teamId],
    queryFn: () => {
      if (!teamId) throw new Error('Team ID is required');
      return teamApi.getTeamSubmissions(teamId);
    },
    enabled: !!teamId && isAuth,
    select: (submissions: SubmissionDto[]) => {
      if (!submissions.length) return null;
      // Sort by submittedAt descending
      return [...submissions].sort((a, b) => {
        const dateA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
        const dateB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
        return dateB - dateA;
      })[0];
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
  });
};

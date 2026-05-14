import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import type { UserSubmissionDto, UserTournamentDto } from '../model/types';

/**
 * Hook for fetching user submissions.
 */
export const useUserSubmissions = () => {
  const { data, isLoading, error } = useQuery<UserSubmissionDto[], Error>({
    queryKey: ['user', 'submissions'],
    queryFn: () => userApi.getSubmissions(),
    placeholderData: keepPreviousData,
  });

  return {
    submissions: data ?? [],
    isLoading,
    error: error ? 'Не вдалося завантажити сабміти' : null,
  };
};

/**
 * Hook for fetching user tournament history.
 */
export const useUserTournaments = () => {
  const { data, isLoading, error } = useQuery<UserTournamentDto[], Error>({
    queryKey: ['user', 'tournaments-history'],
    queryFn: () => userApi.getTournamentHistory(),
    placeholderData: keepPreviousData,
  });

  return {
    tournaments: data ?? [],
    isLoading,
    error: error ? 'Не вдалося завантажити історію турнірів' : null,
  };
};

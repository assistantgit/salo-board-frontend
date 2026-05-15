import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import type {
  TelegramLinkDto,
  TelegramStatusDto,
  UserSubmissionDto,
  UserTournamentDto,
} from '../model/types';

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

/**
 * Hook for fetching Telegram connection link.
 */
export const useTelegramLink = (enabled = false) => {
  const { data, isLoading, error, refetch } = useQuery<TelegramLinkDto, Error>({
    queryKey: ['user', 'telegram-link'],
    queryFn: () => userApi.getTelegramLink(),
    enabled,
    staleTime: 0, // Generated links should usually be fresh
  });

  return {
    link: data?.link,
    isLoading,
    error: error ? 'Не вдалося отримати посилання' : null,
    refetch,
  };
};

/**
 * Hook for fetching Telegram connection status.
 */
export const useTelegramStatus = () => {
  const { data, isLoading, error } = useQuery<TelegramStatusDto, Error>({
    queryKey: ['user', 'telegram-status'],
    queryFn: () => userApi.getTelegramStatus(),
    refetchInterval: (query) => (query.state.data?.connected ? false : 10000), // Poll if not connected
  });

  return {
    isConnected: data?.connected ?? false,
    isLoading,
    error: error ? 'Не вдалося завантажити статус Telegram' : null,
  };
};

import { useEffect, useState } from 'react';
import { userApi } from '../api/userApi';
import type { UserSubmissionDto, UserTournamentDto } from '../model/types';

/**
 * Hook for fetching user submissions.
 */
export const useUserSubmissions = () => {
  const [submissions, setSubmissions] = useState<UserSubmissionDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await userApi.getSubmissions();
        setSubmissions(data);
      } catch (err: unknown) {
        const e = err as { response?: { data?: { detail?: string } } };
        setError(e.response?.data?.detail ?? 'Не вдалося завантажити сабміти');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return { submissions, isLoading, error };
};

/**
 * Hook for fetching user tournament history.
 */
export const useUserTournaments = () => {
  const [tournaments, setTournaments] = useState<UserTournamentDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await userApi.getTournamentHistory();
        setTournaments(data);
      } catch (err: unknown) {
        const e = err as { response?: { data?: { detail?: string } } };
        setError(e.response?.data?.detail ?? 'Не вдалося завантажити історію турнірів');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return { tournaments, isLoading, error };
};

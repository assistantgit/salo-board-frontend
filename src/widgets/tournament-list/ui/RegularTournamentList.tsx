import {
  type TournamentDomain,
  TournamentListBase,
  type TournamentStatus,
  type UserTournamentRole,
  useTournaments,
} from '@entities/tournament';
import { useAuthStore } from '@entities/user';
import { useTournamentFilterStore } from '@features/tournament-filter';
import { TournamentCtaButton } from '@features/tournament-navigation';
import { useEffect } from 'react';

export const RegularTournamentList = () => {
  const search = useTournamentFilterStore((s: { search: string }) => s.search);
  const status = useTournamentFilterStore((s: { status: string }) => s.status);
  const setCount = useTournamentFilterStore((s: { setCount: (c: number) => void }) => s.setCount);

  const role = useAuthStore((s: { role: string }) => s.role);
  const apiRole = (role === 'viewer' ? 'all' : role) as UserTournamentRole | 'all';

  const { tournaments, isLoading, error } = useTournaments({
    name: search || undefined,
    status: status !== 'ALL' ? (status as TournamentStatus) : undefined,
    role: apiRole,
    isArchive: false,
  });

  useEffect(() => {
    if (!isLoading && !error) {
      setCount(tournaments.length);
    }
    if (isLoading) {
      setCount(-1);
    }
  }, [tournaments, isLoading, error, setCount]);

  return (
    <TournamentListBase
      tournaments={tournaments}
      isLoading={isLoading}
      error={error}
      renderCta={(t: TournamentDomain) => <TournamentCtaButton id={t.id} status={t.status} />}
    />
  );
};

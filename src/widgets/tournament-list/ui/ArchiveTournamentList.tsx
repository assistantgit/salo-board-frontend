import { TournamentListBase, useTournaments } from '@entities/tournament';
import { useAuthStore } from '@entities/user';
import { useTournamentFilterStore } from '@features/tournament-filter';
import { TournamentCtaButton } from '@features/tournament-navigation';
import { useEffect } from 'react';

export const ArchiveTournamentList = () => {
  const search = useTournamentFilterStore((s) => s.search);
  const role = useAuthStore((s) => s.role);
  const apiRole = role === 'viewer' ? 'all' : role;

  const { tournaments, isLoading, error } = useTournaments({
    name: search || undefined,
    role: apiRole,
    isArchive: true,
  });

  const setCount = useTournamentFilterStore((s) => s.setCount);

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
      renderCta={(t) => <TournamentCtaButton id={t.id} status={t.status} />}
    />
  );
};

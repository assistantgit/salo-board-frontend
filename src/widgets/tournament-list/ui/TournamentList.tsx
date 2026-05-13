import { TournamentListBase, useTournaments } from '@entities/tournament';
import { useAuthStore } from '@entities/user';
import { useTournamentFilterStore } from '@features/tournament-filter';
import { TournamentCtaButton } from '@features/tournament-navigation';
import { useEffect } from 'react';

/**
 * Self-contained tournament list widget.
 * Now uses TournamentListBase for architectural consistency.
 */
interface TournamentListProps {
  isArchive?: boolean;
}

export const TournamentList = ({ isArchive }: TournamentListProps) => {
  const search = useTournamentFilterStore((s) => s.search);
  const status = useTournamentFilterStore((s) => s.status);
  const setCount = useTournamentFilterStore((s) => s.setCount);

  const role = useAuthStore((s) => s.role);
  const apiRole = role === 'viewer' ? 'all' : role;

  const { tournaments, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, error } =
    useTournaments({
      name: search || undefined,
      status: status !== 'ALL' ? status : undefined,
      role: apiRole,
      isArchive,
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
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      error={error}
      emptyMessage={isArchive ? 'Архів турнірів порожній' : 'Турнірів не знайдено'}
      renderCta={(tournament) => (
        <TournamentCtaButton id={tournament.id} status={tournament.status} />
      )}
    />
  );
};

import { TournamentListBase, useTournaments } from '@entities/tournament';
import { useTournamentFilterStore } from '@features/tournament-filter';
import { EditTournamentButton } from '@features/tournament-navigation';
import { useEffect } from 'react';

export const AdminTournamentList = () => {
  const search = useTournamentFilterStore((s) => s.search);
  const status = useTournamentFilterStore((s) => s.status);
  const setCount = useTournamentFilterStore((s) => s.setCount);

  const {
    tournaments,
    totalCount,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useTournaments({
    name: search || undefined,
    status: status !== 'ALL' ? status : undefined,
    role: 'admin',
  });

  useEffect(() => {
    if (!isLoading && !error) {
      setCount(totalCount);
    }
    if (isLoading) {
      setCount(-1);
    }
  }, [totalCount, isLoading, error, setCount]);

  return (
    <TournamentListBase
      tournaments={tournaments}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      error={error}
      renderCta={(t) => <EditTournamentButton id={t.id} />}
    />
  );
};

import { type TournamentDomain, TournamentListBase } from '@entities/tournament';
import { useAuthStore, useUserTournaments } from '@entities/user';
import { useHistoryFilterStore } from '@features/history-filter';
import { TournamentCtaButton } from '@features/tournament-navigation';
import { useEffect, useMemo } from 'react';

export const HistoryTournamentList = () => {
  const { tournaments, isLoading, error } = useUserTournaments();

  const search = useHistoryFilterStore((s) => s.search);
  const status = useHistoryFilterStore((s) => s.status);
  const setCount = useHistoryFilterStore((s) => s.setCount);

  const filtered = useMemo(() => {
    return tournaments.filter((tour) => {
      const matchesSearch = tour.title.toLowerCase().includes(search.toLowerCase());

      let matchesStatus = false;
      if (status === 'ALL') {
        matchesStatus = true;
      } else if (status === 'active') {
        matchesStatus = tour.status === 'RG' || tour.status === 'RN' || tour.status === 'DR';
      } else if (status === 'completed') {
        matchesStatus = tour.status === 'FN';
      } else if (status === 'AR') {
        matchesStatus = tour.status === 'AR';
      }

      return matchesSearch && matchesStatus;
    });
  }, [tournaments, search, status]);

  useEffect(() => {
    if (!isLoading) {
      setCount(filtered.length);
    } else {
      setCount(-1);
    }
  }, [isLoading, filtered.length, setCount]);

  // Convert DTOs to Domain models for TournamentListBase
  const domainTournaments = useMemo(() => {
    return filtered.map(
      (tour) =>
        ({
          ...tour,
          startDate: new Date(tour.startDate),
          endedAt: new Date(tour.endedAt),
          regOpenAt: new Date(tour.regOpenAt),
          regCloseAt: new Date(tour.regCloseAt),
        }) as unknown as TournamentDomain,
    );
  }, [filtered]);

  return (
    <TournamentListBase
      tournaments={domainTournaments}
      isLoading={isLoading}
      error={error}
      renderCta={(t) => <TournamentCtaButton id={t.id} status={t.status} />}
    />
  );
};

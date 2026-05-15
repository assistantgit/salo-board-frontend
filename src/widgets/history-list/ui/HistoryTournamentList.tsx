import { type TournamentDomain, TournamentListBase } from '@entities/tournament';
import { useUserTournaments } from '@entities/user';
import { useHistoryFilterStore } from '@features/history-filter';
import { TournamentCtaButton } from '@features/tournament-navigation';
import { useEffect, useMemo } from 'react';

export const HistoryTournamentList = () => {
  const { tournaments, isLoading, error } = useUserTournaments();

  const search = useHistoryFilterStore((s) => s.search);
  const status = useHistoryFilterStore((s) => s.status);
  const role = useHistoryFilterStore((s) => s.role);
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

      let matchesRole = false;
      if (role === 'ALL') {
        matchesRole = true;
      } else {
        matchesRole = tour.role === role;
      }

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [tournaments, search, status, role]);

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
      renderCta={(t) => (
        <TournamentCtaButton id={t.id} status={t.status} role={(t as any).role} title={t.title} />
      )}
    />
  );
};

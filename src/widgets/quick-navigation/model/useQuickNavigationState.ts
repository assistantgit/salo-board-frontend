import { useState, useEffect } from 'react';
import { useMyTournamentsByRole } from '@entities/tournament';
import type { RoleTab } from './types';


export function useQuickNavigationState() {
  const participantQuery = useMyTournamentsByRole('participant');
  const adminQuery = useMyTournamentsByRole('admin');
  const juryQuery = useMyTournamentsByRole('jury');

  const isLoading =
    participantQuery.isLoading ||
    adminQuery.isLoading ||
    juryQuery.isLoading;

  const roleTabs: RoleTab[] = ([
    { role: 'participant', tournaments: participantQuery.tournaments },
    { role: 'admin', tournaments: adminQuery.tournaments },
    { role: 'jury', tournaments: juryQuery.tournaments },
  ] as const).filter((tab) => tab.tournaments.length > 0) as RoleTab[];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    if (roleTabs.length > 0 && currentRoleIndex >= roleTabs.length) {
      setCurrentRoleIndex(roleTabs.length - 1);
    }
  }, [roleTabs.length, currentRoleIndex]);

  const totalPages = roleTabs.length;
  const safeIndex = Math.min(currentRoleIndex, Math.max(totalPages - 1, 0));
  const currentTab = roleTabs[safeIndex] ?? null;
  const currentPage = safeIndex + 1;

  const goToPage = (page: number) =>
    setCurrentRoleIndex(Math.max(0, Math.min(page - 1, totalPages - 1)));

  return {
    isLoading,
    isEmpty: !isLoading && roleTabs.length === 0,
    roleTabs,
    currentTab,
    currentPage,
    totalPages,
    goToPage,
  };
}

import type { TournamentDomain, UserTournamentRole } from '@entities/tournament';
import { useAuthStore } from '@entities/user';
import { TournamentDetailsButton } from '@features/tournament-actions';
import type { FC } from 'react';

import { useQuickNavigationState } from '../model/useQuickNavigationState';
import { NavigationEmpty } from './NavigationEmpty/NavigationEmpty';
import { NavigationGuest } from './NavigationGuest/NavigationGuest';
import { NavigationHeader } from './NavigationHeader/NavigationHeader';
import { NavigationSkeleton } from './NavigationSkeleton/NavigationSkeleton';
import styles from './QuickNavigationWidget.module.css';
import { AdminRoleView } from './role-views/AdminRoleView/AdminRoleView';
import { JuryRoleView } from './role-views/JuryRoleView/JuryRoleView';
import { ParticipantRoleView } from './role-views/ParticipantRoleView/ParticipantRoleView';
import { TournamentListView } from './TournamentListView/TournamentListView';

const ROLE_VIEW_MAP: Record<UserTournamentRole, FC<{ tournament: TournamentDomain }>> = {
  participant: ParticipantRoleView,
  admin: AdminRoleView,
  jury: JuryRoleView,
};

export const QuickNavigationWidget = () => {
  const { isAuth, isAuthInProgress } = useAuthStore();

  const { isLoading, isEmpty, currentTab, currentPage, totalPages, goToPage } =
    useQuickNavigationState();

  if (isAuthInProgress) {
    return (
      <div className={styles.card}>
        <NavigationSkeleton />
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div className={styles.card}>
        <NavigationGuest />
      </div>
    );
  }

  // ── Body content ────────────────────────────────────────────
  const renderBody = () => {
    if (isLoading) return <NavigationSkeleton />;
    if (isEmpty || !currentTab) return <NavigationEmpty />;

    const { role, tournaments } = currentTab;

    // List mode: more than one tournament for this role
    if (tournaments.length > 1) {
      return (
        <>
          <NavigationHeader
            role={role}
            tournamentTitle='Турніри'
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
          <TournamentListView tournaments={tournaments} />
        </>
      );
    }

    // Detail mode: exactly one tournament — show role-specific view
    const tournament = tournaments[0];
    const RoleView = ROLE_VIEW_MAP[role];

    return (
      <>
        <NavigationHeader
          role={role}
          tournamentTitle={tournament.title}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
        <RoleView tournament={tournament} />
      </>
    );
  };

  const isListMode = (currentTab?.tournaments.length ?? 0) > 1;

  return (
    <div className={styles.card}>
      {/* key forces animation replay on role tab switch */}
      <div key={currentPage} className={styles.page}>
        {renderBody()}
      </div>

      {!isLoading && !isEmpty && (
        <div className={styles.actions}>
          <TournamentDetailsButton>
            {isListMode ? 'Список турнірів' : 'Деталі турніру'}
          </TournamentDetailsButton>
        </div>
      )}
    </div>
  );
};

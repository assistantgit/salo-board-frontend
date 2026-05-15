import type { TournamentDomain, UserTournamentRole } from '@entities/tournament';
import { type UserRole, useAuthStore } from '@entities/user';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

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

/** Map tournament role → auth store UserRole for the RoleSwitcher */
const ROLE_TO_USER_ROLE: Partial<Record<UserTournamentRole, UserRole>> = {
  participant: 'participant',
  jury: 'jury',
};

export const QuickNavigationWidget = () => {
  const { isAuth, isAuthInProgress, setRole } = useAuthStore();
  const navigate = useNavigate();

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

  const role = currentTab?.role;

  const handleMainAction = () => {
    if (role === 'admin') {
      navigate('/admin/tournaments');
      return;
    }

    // For participant / jury: set the matching role in the switcher and scroll to board
    const userRole = role ? ROLE_TO_USER_ROLE[role] : undefined;
    if (userRole) {
      setRole(userRole);
    }

    // Scroll to the tournament board (with slight delay so role state propagates)
    setTimeout(() => {
      const board = document.getElementById('tournament-board');
      board?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const buttonLabel = role === 'admin' ? 'Адмін турніри' : 'До списку турнірів';

  return (
    <div className={styles.card}>
      {/* key forces animation replay on role tab switch */}
      <div key={currentPage} className={styles.page}>
        {renderBody()}
      </div>

      {!isLoading && !isEmpty && (
        <div className={styles.actions}>
          <button type='button' className={styles.mainButton} onClick={handleMainAction}>
            {buttonLabel}
          </button>
        </div>
      )}
    </div>
  );
};

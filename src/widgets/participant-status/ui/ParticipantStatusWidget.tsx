import { useState, useEffect, type FC } from 'react';
import type { UserTournamentRole, TournamentDomain } from '@entities/tournament';
import { 
  useMyTournamentsByRole, 
  TournamentListRow 
} from '@entities/tournament';
import { TrophyIcon } from '@shared/ui/icons';
import { TournamentDetailsButton } from '@features/tournament-actions';

import { WidgetHeader } from './WidgetHeader';
import { WidgetSkeleton } from './WidgetSkeleton';
import { EmptyState } from './EmptyState';
import { ParticipantView } from './views/ParticipantView';
import { AdminView } from './views/AdminView';
import { JuryView } from './views/JuryView';

import styles from './ParticipantStatusWidget.module.css';

/**
 * Strategy Map for Role Views.
 * Adheres to Open/Closed Principle (OCP).
 */
const ROLE_VIEWS: Record<UserTournamentRole, FC<{ tournament: TournamentDomain }>> = {
  participant: ParticipantView,
  admin: AdminView,
  jury: JuryView,
};

export const ParticipantStatusWidget = () => {
  // Data fetching
  const participantData = useMyTournamentsByRole('participant');
  const adminData = useMyTournamentsByRole('admin');
  const juryData = useMyTournamentsByRole('jury');

  const allRolesData = [
    { role: 'participant' as const, ...participantData },
    { role: 'admin' as const, ...adminData },
    { role: 'jury' as const, ...juryData },
  ];

  const isLoading = allRolesData.some((d) => d.isLoading);
  const activeRoles = allRolesData.filter((d) => !d.isLoading && d.tournaments.length > 0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPage > activeRoles.length && activeRoles.length > 0) {
      setCurrentPage(activeRoles.length);
    }
  }, [activeRoles.length, currentPage]);

  const totalPages = activeRoles.length;
  const currentIndex = Math.min(currentPage - 1, Math.max(totalPages - 1, 0));
  const current = activeRoles[currentIndex];

  /**
   * Render internal content based on current selection
   */
  const renderContent = () => {
    if (isLoading) return <WidgetSkeleton />;
    if (totalPages === 0) return <EmptyState />;

    const { role, tournaments } = current;

    // If a single role has multiple tournaments, show a list
    if (tournaments.length > 1) {
      return (
        <>
          <WidgetHeader
            role={role}
            title="Турніри"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            tournamentTitle="Ваші турніри"
          />
          <div className={styles.content}>
            {tournaments.map((t) => (
              <TournamentListRow
                key={t.id}
                icon={TrophyIcon}
                title={t.title}
                teamsCount={t.teamsCount}
                endedAt={t.endedAt}
              />
            ))}
          </div>
        </>
      );
    }

    // Specific tournament view
    const t = tournaments[0];
    const ViewComponent = ROLE_VIEWS[role];

    return (
      <>
        <WidgetHeader
          role={role}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          tournamentTitle={t.title}
        />
        <ViewComponent tournament={t} />
      </>
    );
  };

  return (
    <div className={styles.widgetCard}>
      {renderContent()}
      
      <div className={styles.actions}>
        <TournamentDetailsButton />
      </div>
    </div>
  );
};

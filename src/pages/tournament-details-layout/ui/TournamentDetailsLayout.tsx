import { useMyTeamInTournament } from '@entities/team';
import { NotFoundPage } from '@pages/not-found-page';
import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { TournamentSidebar, TournamentSidebarContent } from '@widgets/tournament-sidebar';
import { Outlet, useParams } from 'react-router-dom';
import { DETAILS_BG_CONFIG } from '../config/bgConfig';
import styles from './TournamentDetailsLayout.module.css';

/**
 * TournamentDetailsLayout — layout for tournament participants.
 *
 * Desktop (>1024px): sticky sidebar left + BGLayout content area right.
 * ≤1024px: sidebar hidden, navigation lives in the burger MobileMenu.
 *
 * Access guard: if the current user has no team in this tournament,
 * we show NotFoundPage instead of silently redirecting — the user
 * gets a clear signal that this route is not available to them.
 */
export function TournamentDetailsLayout() {
  const { id } = useParams<{ id: string }>();
  const { data: myTeam, isLoading } = useMyTeamInTournament(Number(id));

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.loadingState}>Перевірка доступу...</div>
        </main>
      </div>
    );
  }

  if (!myTeam) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.pageWrapper}>
      <Header mobileMenuExtension={<TournamentSidebarContent mobile />} />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Hidden on ≤1024px via CSS — nav moves to burger menu */}
          <div className={styles.sidebarSlot}>
            <TournamentSidebar />
          </div>

          {/* BGLayout fills the content column, hugs the sidebar */}
          <BGLayout bgConfig={DETAILS_BG_CONFIG} className={styles.contentBg}>
            <section className={styles.content}>
              <Outlet />
            </section>
          </BGLayout>
        </div>
      </main>
    </div>
  );
}

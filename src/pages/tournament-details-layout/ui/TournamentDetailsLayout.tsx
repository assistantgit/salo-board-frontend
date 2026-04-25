import { Outlet, useParams, Navigate } from 'react-router-dom';
import { Header } from '@widgets/header';
import { TournamentSidebar, TournamentSidebarContent } from '@widgets/tournament-sidebar';
import { BGLayout } from '@widgets/bg-layout';
import { useMyTeamInTournament } from '@entities/team';
import { DETAILS_BG_CONFIG } from '../config/bgConfig';
import styles from './TournamentDetailsLayout.module.css';

/**
 * TournamentDetailsLayout — layout for tournament participants.
 *
 * Desktop (>1024px): sticky sidebar left + BGLayout content area right.
 * ≤1024px: sidebar hidden, navigation lives in the burger MobileMenu.
 *
 * BGLayout wraps only the content column so the decorative background
 * sits flush against the sidebar — no visual gap.
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
    return <Navigate to={`/tournaments/${id}`} replace />;
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

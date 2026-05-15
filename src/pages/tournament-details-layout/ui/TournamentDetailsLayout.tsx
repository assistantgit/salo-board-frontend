import { useMyTeamInTournament } from '@entities/team';
import { useAuthStore } from '@entities/user';
import { NotFoundPage } from '@pages/not-found-page';
import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { TournamentSidebar, TournamentSidebarContent } from '@widgets/tournament-sidebar';
import { Outlet, useParams } from 'react-router-dom';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import styles from './TournamentDetailsLayout.module.css';

export function TournamentDetailsLayout() {
  const { id } = useParams<{ id: string }>();
  const isAuth = useAuthStore((state) => state.isAuth);
  const isAuthInProgress = useAuthStore((state) => state.isAuthInProgress);
  const { data: myTeam, isLoading: isTeamLoading } = useMyTeamInTournament(Number(id));

  const isLoading = isAuthInProgress || (isAuth && isTeamLoading);

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

  if (!isAuth || !myTeam) {
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
          <BGLayout bgConfig={BG_LAYOUT_CONFIG} className={styles.contentBg}>
            <section className={styles.content}>
              <Outlet />
            </section>
          </BGLayout>
        </div>
      </main>
    </div>
  );
}

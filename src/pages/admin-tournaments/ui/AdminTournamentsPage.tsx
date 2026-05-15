import { CreateTournamentButton } from '@features/create-tournament/ui/CreateTournamentButton';
import { AdminPageLayout } from '@widgets/admin-page-layout';
import { TournamentFilters } from '@widgets/tournament-filters';
import { AdminTournamentList } from '@widgets/tournament-list';
import type React from 'react';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import styles from './AdminTournamentsPage.module.css';

export const AdminTournamentsPage: React.FC = () => {
  return (
    <AdminPageLayout
      title='Турніри'
      subtitle='Керування турнірами SaloBoard'
      actions={<CreateTournamentButton />}
      bgConfig={BG_LAYOUT_CONFIG}
    >
      <div className={styles.pageContent}>
        <section className={styles.filterSection}>
          <TournamentFilters variant='admin' />
        </section>

        <main className={styles.listSection}>
          <AdminTournamentList />
        </main>
      </div>
    </AdminPageLayout>
  );
};

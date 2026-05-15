import { AdminPageLayout } from '@widgets/admin-page-layout';
import { AdminRecentTournaments } from '@widgets/admin-recent-tournaments';
import type React from 'react';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';

/**
 * AdminOverviewPage — shell page for the admin panel.
 */
export const AdminOverviewPage: React.FC = () => {
  return (
    <AdminPageLayout
      title='Головна'
      subtitle='Загальна статистика SaloBoard'
      bgConfig={BG_LAYOUT_CONFIG}
    >
      <AdminRecentTournaments />
    </AdminPageLayout>
  );
};

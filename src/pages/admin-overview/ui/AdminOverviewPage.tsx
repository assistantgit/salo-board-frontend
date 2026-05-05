import { AdminPageLayout } from '@widgets/admin-page-layout';
import type React from 'react';

/**
 * AdminOverviewPage — shell page for the admin panel.
 */
export const AdminOverviewPage: React.FC = () => {
  return (
    <AdminPageLayout title='Головна' subtitle='Загальна статистика SaloBoard'>
      {/* Content will be populated as admin features are built */}
    </AdminPageLayout>
  );
};

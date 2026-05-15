import { AdminPageLayout } from '@widgets/admin-page-layout';
import { AdminSubmissionList } from '@widgets/admin-submit-list';
import type React from 'react';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';

export const AdminSubmissionsPage: React.FC = () => {
  return (
    <AdminPageLayout
      title='Роботи'
      subtitle='Керування та перегляд зданих робіт усіх команд'
      bgConfig={BG_LAYOUT_CONFIG}
    >
      <AdminSubmissionList />
    </AdminPageLayout>
  );
};

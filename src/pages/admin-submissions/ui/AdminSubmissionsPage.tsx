import { AdminPageLayout } from '@widgets/admin-page-layout';
import { AdminSubmissionList } from '@widgets/admin-submit-list';
import type React from 'react';

export const AdminSubmissionsPage: React.FC = () => {
  return (
    <AdminPageLayout title='Роботи' subtitle='Керування та перегляд зданих робіт усіх команд'>
      <AdminSubmissionList />
    </AdminPageLayout>
  );
};

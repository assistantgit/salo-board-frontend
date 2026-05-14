import { AdminEvaluationList } from '@widgets/admin-evaluation-list';
import { AdminPageLayout } from '@widgets/admin-page-layout';
import type React from 'react';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';

export const AdminEvaluationsPage: React.FC = () => {
  return (
    <AdminPageLayout title='Оцінки' subtitle='Керування оцінками журі' bgConfig={BG_LAYOUT_CONFIG}>
      <AdminEvaluationList />
    </AdminPageLayout>
  );
};

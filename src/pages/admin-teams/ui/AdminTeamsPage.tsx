import { AdminPageLayout } from '@widgets/admin-page-layout';
import type React from 'react';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';

export const AdminTeamsPage: React.FC = () => {
  return (
    <AdminPageLayout
      title='Команди'
      subtitle='Керування командами SaloBoard'
      bgConfig={BG_LAYOUT_CONFIG}
    >
      {/* Content will be added here */}
    </AdminPageLayout>
  );
};

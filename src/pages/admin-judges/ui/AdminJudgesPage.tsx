import { AdminPageLayout } from '@widgets/admin-page-layout';
import type React from 'react';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';

export const AdminJudgesPage: React.FC = () => {
  return (
    <AdminPageLayout
      title='Судді'
      subtitle='Керування суддівським складом'
      bgConfig={BG_LAYOUT_CONFIG}
    >
      {/* Content will be added here */}
    </AdminPageLayout>
  );
};

import { ADMIN_BG_CONFIG } from '@shared/config/bgConfig';
import { AdminSidebar } from '@widgets/admin-sidebar';
import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import type React from 'react';
import styles from './AdminPageLayout.module.css';

interface AdminPageLayoutProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  subtitle,
  children,
  actions,
}) => {
  return (
    <div className={styles.pageWrapper}>
      <Header mobileMenuExtension={<AdminSidebar mobile />} />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.sidebarSlot}>
            <AdminSidebar />
          </div>

          <BGLayout bgConfig={ADMIN_BG_CONFIG} className={styles.contentBg}>
            <section className={styles.content}>
              <header className={styles.contentHeader}>
                <div className={styles.titleGroup}>
                  <h1 className={styles.title}>{title}</h1>
                  <p className={styles.subtitle}>{subtitle}</p>
                </div>
                {actions && <div className={styles.actions}>{actions}</div>}
              </header>

              {children}
            </section>
          </BGLayout>
        </div>
      </main>
    </div>
  );
};

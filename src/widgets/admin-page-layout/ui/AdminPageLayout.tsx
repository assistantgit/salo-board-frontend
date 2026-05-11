import { ADMIN_BG_CONFIG } from '@shared/config/bgConfig';
import { ArrowBackIcon } from '@shared/ui/icons';
import { AdminSidebar } from '@widgets/admin-sidebar';
import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminPageLayout.module.css';

interface AdminPageLayoutProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  withBackButton?: boolean;
}

export const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  subtitle,
  children,
  actions,
  withBackButton,
}) => {
  const navigate = useNavigate();
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
                  {withBackButton && (
                    <button className={styles.backButton} onClick={() => navigate(-1)}>
                      <ArrowBackIcon />
                    </button>
                  )}
                  <div>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>
                  </div>
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

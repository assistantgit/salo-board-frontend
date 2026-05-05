import { SidebarLayout } from '@shared/ui';
import type React from 'react';
import { NAVIGATION_GROUPS } from '../config/navigationGroups';
import styles from './AdminSidebar.module.css';
import { AdminNavGroup } from './components/AdminNavGroup/AdminNavGroup';

interface AdminSidebarProps {
  mobile?: boolean;
}

/**
 * AdminSidebar — renders the admin navigation sidebar.
 * Delegates group rendering to AdminNavGroup (SRP).
 */
export const AdminSidebar: React.FC<AdminSidebarProps> = ({ mobile = false }) => {
  return (
    <SidebarLayout mobile={mobile} ariaLabel='Адмінпанель' className={styles.sidebar}>
      <nav className={styles.nav} aria-label='Навігація адмінпанелі'>
        {NAVIGATION_GROUPS.map((group) => (
          <AdminNavGroup key={group.title} title={group.title} items={group.items} />
        ))}
      </nav>
    </SidebarLayout>
  );
};

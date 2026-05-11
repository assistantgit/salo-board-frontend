import { Tabs } from '@shared/ui';
import type React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './JuryTabs.module.css';

const JURY_TABS = [
  { id: '/jury/tournaments', label: 'Турніри' },
  { id: '/jury/submissions', label: 'Роботи' },
];

interface JuryTabsProps {
  variant?: 'header' | 'mobile';
}

export const JuryTabs: React.FC<JuryTabsProps> = ({ variant = 'header' }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (id: string) => {
    navigate(id);
  };

  if (variant === 'mobile') {
    return (
      <div className={styles.mobileContainer}>
        {JURY_TABS.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.id}
            className={({ isActive }) =>
              `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Tabs
        items={JURY_TABS}
        activeId={pathname}
        onChange={handleTabChange}
        className={styles.tabs}
      />
    </div>
  );
};

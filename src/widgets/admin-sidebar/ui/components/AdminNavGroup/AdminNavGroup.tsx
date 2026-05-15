import type React from 'react';
import { NavLink } from 'react-router-dom';
import type { NavItem } from '../../../config/navigationGroups';
import styles from './AdminNavGroup.module.css';

interface AdminNavGroupProps {
  title: string;
  items: NavItem[];
}

/**
 * AdminNavGroup — renders a single labeled section of nav links.
 * Single Responsibility: only knows how to render one group.
 */
export const AdminNavGroup: React.FC<AdminNavGroupProps> = ({ title, items }) => {
  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>{title}</h3>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

import { ArchiveIcon, ClipboardCheckIcon, DocumentIcon, GridIcon, PeopleIcon } from '@shared/ui';
import type { ReactNode } from 'react';

export interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const NAVIGATION_GROUPS: NavGroup[] = [
  {
    title: 'Загальне',
    items: [{ to: '/admin/overview', label: 'Головна', icon: <GridIcon /> }],
  },
  {
    title: 'Керування',
    items: [
      { to: '/admin/tournaments', label: 'Турніри', icon: <ArchiveIcon /> },
      { to: '/admin/teams', label: 'Команди', icon: <PeopleIcon /> },
      { to: '/admin/evaluation', label: 'Оцінки', icon: <ClipboardCheckIcon /> },
      { to: '/admin/submissions', label: 'Роботи', icon: <DocumentIcon /> },
    ],
  },
];

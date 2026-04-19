import type { FC } from 'react';
import type { UserTournamentRole } from '@entities/tournament';
import { Pagination } from '@shared/ui/pagination/Pagination';
import { PersonIcon, BuildIcon, BriefcaseIcon } from '@shared/ui/icons';
import styles from './NavigationHeader.module.css';

interface NavigationHeaderProps {
  role: UserTournamentRole;
  tournamentTitle: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ROLE_CONFIG: Record<UserTournamentRole, { label: string; Icon: FC<{ className?: string }> }> = {
  participant: { label: 'Учасник', Icon: PersonIcon },
  admin: { label: 'Адміністратор', Icon: BuildIcon },
  jury: { label: 'Журі', Icon: BriefcaseIcon },
};

export const NavigationHeader = ({
  role,
  tournamentTitle,
  currentPage,
  totalPages,
  onPageChange,
}: NavigationHeaderProps) => {
  const { label, Icon } = ROLE_CONFIG[role];

  const title =
    tournamentTitle !== 'Турніри'
      ? `Поточний стан — ${tournamentTitle}`
      : 'Мої турніри';

  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <span className={styles.roleChip}>
          <Icon className={styles.roleIcon} />
          {label}
        </span>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>

      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};

import { PersonIcon, BuildIcon, BriefcaseIcon } from '@shared/ui/icons';
import { Pagination } from '@shared/ui/pagination/Pagination';
import type { UserTournamentRole } from '@entities/tournament';
import styles from './ParticipantStatusWidget.module.css';

interface WidgetHeaderProps {
  role: UserTournamentRole;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  tournamentTitle: string;
}

const ROLE_CONFIG: Record<UserTournamentRole, { name: string; icon: React.ElementType }> = {
  participant: { name: 'Учасник', icon: PersonIcon },
  admin: { name: 'Адміністратор', icon: BuildIcon },
  jury: { name: 'Журі', icon: BriefcaseIcon },
};

export const WidgetHeader = ({
  role,
  totalPages,
  currentPage,
  onPageChange,
  tournamentTitle,
}: WidgetHeaderProps) => {
  const { name, icon: Icon } = ROLE_CONFIG[role];

  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <span className={styles.userRoleLabel}>
          <Icon className={styles.roleIcon} />
          {name}
        </span>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
      <h3 className={styles.title}>{tournamentTitle}</h3>
    </div>
  );
};

import styles from './OrganizerCard.module.css';
import { UserAvatar } from '@entities/user/ui/UserAvatar/UserAvatar';

export interface OrganizerCardProps {
  fullName: string;
  role: string;
  subRole?: string;
}

export const OrganizerCard: React.FC<OrganizerCardProps> = ({ fullName, role, subRole }) => {
  return (
    <div className={styles.card}>
      <div className={styles.leftCol}>
        {role}
      </div>
      <div className={styles.rightCol}>
        <UserAvatar fullName={fullName} size="lg" className={styles.avatar} />
        <div className={styles.userInfo}>
          <p className={styles.userName}>{fullName}</p>
          {subRole && <p className={styles.userSubRole}>{subRole}</p>}
        </div>
      </div>
    </div>
  );
};

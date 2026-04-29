import type React from 'react';
import type { TeamDomain } from '../../model/team.types';
import styles from './TeamRow.module.css';

interface TeamRowProps {
  team: TeamDomain;
  color?: string;
}

export const TeamRow: React.FC<TeamRowProps> = ({ team, color }) => {
  const avatarStyle = color ? ({ '--avatar-bg': color } as React.CSSProperties) : {};

  return (
    <div className={styles.teamRow}>
      <div className={styles.avatar} style={avatarStyle}>
        {team.initials}
      </div>
      <span className={styles.name}>{team.name}</span>
    </div>
  );
};

import type React from 'react';
import { getTeamColor, getTeamInitials } from '../../lib/teamAvatar';
import styles from './TeamAvatar.module.css';

interface TeamAvatarProps {
  teamName: string;
  size?: string;
  fontSize?: string;
  className?: string;
}

export const TeamAvatar: React.FC<TeamAvatarProps> = ({
  teamName,
  size = 'clamp(30px, 4vw, 50px)',
  fontSize = 'clamp(0.8rem, 1.2vw, 1.2rem)',
  className = '',
}) => {
  const avatarColor = getTeamColor(teamName);
  const initials = getTeamInitials(teamName);

  return (
    <div
      className={`${styles.teamAvatar} ${className}`}
      style={{
        backgroundColor: avatarColor,
        width: size,
        height: size,
        fontSize,
      }}
      aria-hidden='true'
    >
      {initials}
    </div>
  );
};

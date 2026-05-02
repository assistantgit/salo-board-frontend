import { TeamMemberCard, TeamMemberSlot } from '@entities/team-member';
import type { TeamMember } from '@entities/team-member/model/types';
import type React from 'react';
import styles from './TeamSwitcherWidget.module.css'; // Reusing widget styles or local grid styles

export interface TeamMemberListProps {
  members: TeamMember[];
  maxSize: number;
  onDeleteMember?: (id: string) => void;
  className?: string;
}

/**
 * TeamMemberList component renders the grid of team members and empty slots.
 * Sub-component of TeamSwitcherWidget.
 */
export const TeamMemberList: React.FC<TeamMemberListProps> = ({
  members,
  maxSize,
  onDeleteMember,
  className = '',
}) => {
  const emptySlotsCount = Math.max(0, maxSize - members.length);
  const emptySlots = Array.from({ length: emptySlotsCount }, (_, i) => i);

  return (
    <div className={`${styles['team-member-list']} ${className}`}>
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} onDelete={onDeleteMember} />
      ))}
      {emptySlots.map((id) => (
        <TeamMemberSlot key={`slot-${id}`} />
      ))}
    </div>
  );
};

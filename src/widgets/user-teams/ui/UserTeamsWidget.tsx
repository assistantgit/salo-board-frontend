import {
  type TeamDomain,
  type TeamInvitationDto,
  type TeamMemberDto,
  teamApi,
  useMyTeams,
  useTeamInvites,
  useTeamMembers,
} from '@entities/team';
import { type TeamMember, TeamMemberCard, TeamMemberSlot } from '@entities/team-member';
import { useAuthStore } from '@entities/user';
import { InviteMemberButton, LeaveTeamButton } from '@features/manage-team';
import { Divider, Pagination } from '@shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import type React from 'react';
import { useState } from 'react';
import styles from './UserTeamsWidget.module.css';

// ── Helpers ─────────────────────────────────────────────────────

function mapToTeamMember(dto: TeamMemberDto, currentEmail?: string): TeamMember {
  return {
    id: dto.id,
    fullName: `${dto.userFirstName} ${dto.userLastName}`,
    isLead: dto.isCaptain,
    isCurrentUser: !!currentEmail && dto.userEmail === currentEmail,
    canBeDeleted: !dto.isCaptain,
  };
}

function mapInviteToTeamMember(dto: TeamInvitationDto): TeamMember {
  return {
    id: dto.id.toString(),
    fullName: `${dto.firstName} ${dto.lastName}`,
    isPending: true,
    canBeDeleted: true, // Lead can delete pending invites
  };
}

function isRegistrationOpen(regCloseAt?: string): boolean {
  if (!regCloseAt) return true; // if unknown, allow (backend will validate)
  return new Date(regCloseAt) > new Date();
}

// ── Skeleton ─────────────────────────────────────────────────────

const UserTeamsWidgetSkeleton: React.FC = () => (
  <section className={styles.widget}>
    <div className={`${styles.header} ${styles.skeletonHeader}`}>
      <div className={`${styles.skeletonBar} ${styles.skeletonTitle}`} />
    </div>
    <Divider />
    <div className={styles.content}>
      <div className={styles.memberGrid}>
        {[1, 2, 3, 4].map((id) => (
          <div key={`skeleton-member-${id}`} className={styles.skeletonCard} />
        ))}
      </div>
    </div>
  </section>
);

// ── Widget ────────────────────────────────────────────────────────

export const UserTeamsWidget: React.FC = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: teams = [], isLoading: isTeamsLoading } = useMyTeams();

  const currentTeam = teams[currentPage - 1] as TeamDomain | undefined;

  const { data: rawMembers = [], isLoading: isMembersLoading } = useTeamMembers(currentTeam?.id);
  const { data: rawInvites = [], isLoading: isInvitesLoading } = useTeamInvites(currentTeam?.id);

  if (isTeamsLoading) return <UserTeamsWidgetSkeleton />;
  if (teams.length === 0) return null;

  const members: TeamMember[] = [
    ...rawMembers.map((m) => mapToTeamMember(m, user?.email)),
    ...rawInvites.map(mapInviteToTeamMember),
  ];
  const currentMemberDto = rawMembers.find((m) => user?.email && m.userEmail === user.email);
  const isLead = currentMemberDto?.isCaptain ?? false;
  const canAddMembers = isLead && isRegistrationOpen(currentTeam?.regCloseAt);

  const maxSize = currentTeam?.maxTeamSize ?? 4;
  const emptySlotsCount = Math.max(0, maxSize - members.length);
  const emptySlots = Array.from({ length: emptySlotsCount }, (_, i) => `slot-${i}`);

  const handleDeleteMember = async (memberId: string) => {
    if (!currentTeam) return;
    try {
      await teamApi.removeMember(currentTeam.id, memberId);
      queryClient.invalidateQueries({ queryKey: ['team-members', currentTeam.id] });
    } catch {
      // silent — backend error will surface on refetch
    }
  };

  const handleLeaveSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['my-teams'] });
    setCurrentPage(1);
  };

  const handleAddSuccess = () => {
    if (!currentTeam) return;
    queryClient.invalidateQueries({ queryKey: ['team-members', currentTeam.id] });
    queryClient.invalidateQueries({ queryKey: ['team-invites', currentTeam.id] });
  };

  return (
    <section className={styles.widget}>
      <header className={styles.header}>
        <div className={styles.titles}>
          <h2 className={styles.title}>
            Склад команди — <span className={styles.teamName}>{currentTeam?.name ?? '…'}</span>
          </h2>
          {currentTeam?.tournamentTitle && (
            <p className={styles.subtitle}>{currentTeam.tournamentTitle}</p>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={teams.length}
          onPageChange={setCurrentPage}
        />
      </header>

      <Divider />

      <main className={styles.content}>
        {isMembersLoading || isInvitesLoading ? (
          <div className={styles.loadingRow}>
            {[1, 2, 3, 4].map((id) => (
              <div key={`loading-skeleton-card-${id}`} className={styles.skeletonCard} />
            ))}
          </div>
        ) : (
          <div
            className={`${styles.memberGrid} ${!(isMembersLoading || isInvitesLoading) ? styles.memberGridAnimate : ''}`}
            key={`team-grid-${currentTeam?.id}`}
          >
            {members.map((member) => (
              <TeamMemberCard
                key={`member-${member.id}`}
                member={member}
                onDelete={isLead && !member.isCurrentUser ? handleDeleteMember : undefined}
              />
            ))}
            {emptySlots.map((id) => (
              <TeamMemberSlot key={`slot-id-${id}`} />
            ))}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerActions}>
          <div className={styles.managementButtons}>
            {canAddMembers && currentTeam && (
              <InviteMemberButton teamId={currentTeam.id} onSuccess={handleAddSuccess} />
            )}

            {currentTeam && (
              <LeaveTeamButton
                teamId={currentTeam.id}
                isLead={isLead}
                members={members}
                onSuccess={handleLeaveSuccess}
              />
            )}
          </div>
        </div>
      </footer>
    </section>
  );
};

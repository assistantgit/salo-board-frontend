import { type TeamDomain, type TeamMemberDto, teamApi, useTeamMembers } from '@entities/team';
import { type TeamMember, TeamMemberCard, TeamMemberSlot } from '@entities/team-member';
import { useAuthStore } from '@entities/user';
import { InviteMemberButton, LeaveTeamButton } from '@features/manage-team';
import { Divider, Pagination } from '@shared/ui';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`skeleton-member-${i}`} className={styles.skeletonCard} />
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

  const { data: teams = [], isLoading: isTeamsLoading } = useQuery<TeamDomain[]>({
    queryKey: ['my-teams'],
    queryFn: teamApi.getMyTeams,
    staleTime: 1000 * 60 * 5,
  });

  const currentTeam = teams[currentPage - 1] as TeamDomain | undefined;

  const { data: rawMembers = [], isLoading: isMembersLoading } = useTeamMembers(currentTeam?.id);

  if (isTeamsLoading) return <UserTeamsWidgetSkeleton />;
  if (teams.length === 0) return null;

  const members: TeamMember[] = rawMembers.map((m) => mapToTeamMember(m, user?.email));
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
        {isMembersLoading ? (
          <div className={styles.loadingRow}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`loading-skeleton-card-${i}`} className={styles.skeletonCard} />
            ))}
          </div>
        ) : (
          <div
            className={`${styles.memberGrid} ${!isMembersLoading ? styles.memberGridAnimate : ''}`}
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
                onSuccess={handleLeaveSuccess}
              />
            )}
          </div>
        </div>
      </footer>
    </section>
  );
};

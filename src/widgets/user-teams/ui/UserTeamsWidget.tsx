import {
  CAN_ADD_MEMBER_QUERY_KEY,
  type TeamDomain,
  type TeamInvitationDto,
  type TeamMemberDto,
  teamApi,
  useCanAddMember,
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
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './UserTeamsWidget.module.css';

// ── Helpers ─────────────────────────────────────────────────────

function mapToTeamMember(dto: TeamMemberDto, currentEmail?: string): TeamMember {
  return {
    id: dto.user.toString(), // {user_id} in DELETE /participant/{user_id}
    fullName: `${dto.userFirstName} ${dto.userLastName}`,
    isLead: dto.isCaptain,
    isCurrentUser: !!currentEmail && dto.userEmail === currentEmail,
    canBeDeleted: !dto.isCaptain,
  };
}

function mapInviteToTeamMember(dto: TeamInvitationDto): TeamMember {
  return {
    id: `invite-${dto.id}`,
    fullName: `${dto.firstName} ${dto.lastName}`,
    isPending: true,
    canBeDeleted: false, // No DELETE /invites/{id} endpoint available
  };
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
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: teams = [], isLoading: isTeamsLoading } = useMyTeams();

  // Auto-open the team specified by ?teamId=<id> in the URL
  useEffect(() => {
    const teamId = searchParams.get('teamId');
    if (teamId && teams.length > 0) {
      const idx = teams.findIndex((t) => String(t.id) === teamId);
      if (idx !== -1) {
        setCurrentPage(idx + 1);
      }
    }
  }, [searchParams, teams]);

  const currentTeam = teams[currentPage - 1] as TeamDomain | undefined;

  const { data: rawMembers = [], isLoading: isMembersLoading } = useTeamMembers(currentTeam?.id);
  const { data: rawInvites = [], isLoading: isInvitesLoading } = useTeamInvites(currentTeam?.id);
  const { data: canAddByApi = false } = useCanAddMember(currentTeam?.id);

  if (isTeamsLoading) return <UserTeamsWidgetSkeleton />;
  if (teams.length === 0) return null;

  const members: TeamMember[] = [
    ...rawMembers.map((m) => mapToTeamMember(m, user?.email)),
    ...rawInvites.map(mapInviteToTeamMember),
  ];

  const currentMemberDto = rawMembers.find((m) => user?.email && m.userEmail === user.email);
  const isLead = currentMemberDto?.isCaptain ?? false;

  // Empty slots: only render if maxTeamSize is known (comes from detailed team endpoint)
  const maxSize = currentTeam?.maxTeamSize;
  const emptySlotsCount = maxSize ? Math.max(0, maxSize - members.length) : 0;
  const emptySlots = Array.from({ length: emptySlotsCount }, (_, i) => `slot-${i}`);

  const handleDeleteMember = async (memberId: string) => {
    if (!currentTeam) return;
    try {
      await teamApi.removeMember(currentTeam.id, memberId);
      queryClient.invalidateQueries({ queryKey: ['team-members', currentTeam.id] });
      queryClient.invalidateQueries({ queryKey: CAN_ADD_MEMBER_QUERY_KEY(currentTeam.id) });
    } catch {
      // Button is hidden when status !== 'RG', so errors here are edge cases
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
    queryClient.invalidateQueries({ queryKey: CAN_ADD_MEMBER_QUERY_KEY(currentTeam.id) });
  };

  return (
    <section id='user-teams-widget' className={styles.widget}>
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
            className={`${styles.memberGrid} ${styles.memberGridAnimate}`}
            key={`team-grid-${currentTeam?.id}`}
          >
            {members.map((member) => (
              <TeamMemberCard
                key={`member-${member.id}`}
                member={member}
                onDelete={
                  isLead && !member.isCurrentUser && !member.isPending && canAddByApi
                    ? handleDeleteMember
                    : undefined
                }
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
            {canAddByApi && currentTeam && (
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

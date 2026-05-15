import { adminTeamApi, type TeamDomain, type TeamStatus } from '@entities/team';
import { TournamentCardHeader, type TournamentStatus } from '@entities/tournament';
import { BaseCard, DefaultButton, PodiumIcon, Skeleton, TrashIcon } from '@shared/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type React from 'react';
import styles from './AdminTeamWidget.module.css';

interface AdminTeamWidgetProps {
  team: TeamDomain;
  onDisqualify: (teamId: number) => void;
  isDisqualifying?: boolean;
}

const STATUS_MAP: Record<TeamStatus, TournamentStatus> = {
  RG: 'RG',
  DQ: 'RN',
  AR: 'FN',
};

const STATUS_LABELS: Record<TeamStatus, string> = {
  RG: 'Активна',
  DQ: 'Дискваліфікована',
  AR: 'В архіві',
};

export const AdminTeamWidget: React.FC<AdminTeamWidgetProps> = ({
  team,
  onDisqualify,
  isDisqualifying,
}) => {
  const queryClient = useQueryClient();
  const { id, name, status, tournamentId, tournamentTitle } = team;

  const { data: participants = [], isLoading } = useQuery({
    queryKey: ['admin', 'tournament', tournamentId, 'team', id, 'participants'],
    queryFn: () => adminTeamApi.getTeamParticipants(tournamentId, id),
    staleTime: 1000 * 60 * 5,
  });

  const transferCaptainMutation = useMutation({
    mutationFn: (userId: number) => adminTeamApi.transferCaptainStatus(tournamentId, id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'tournament', tournamentId, 'team', id, 'participants'],
      });
    },
  });

  const removeParticipantMutation = useMutation({
    mutationFn: (userId: number) => adminTeamApi.removeParticipant(tournamentId, id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'tournament', tournamentId, 'team', id, 'participants'],
      });
    },
  });

  return (
    <BaseCard
      className={styles.card}
      header={
        <TournamentCardHeader
          title={name}
          status={STATUS_MAP[status]}
          statusLabel={STATUS_LABELS[status]}
          withBackground={true}
        />
      }
      footer={
        <div className={styles.footer}>
          {status !== 'DQ' && (
            <DefaultButton
              className={styles.disqualifyButton}
              onClick={() => onDisqualify(id)}
              disabled={isDisqualifying}
            >
              {isDisqualifying ? '...' : 'Дискваліфікувати'}
            </DefaultButton>
          )}
        </div>
      }
    >
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Турнір</span>
          <span className={styles.statValue}>{tournamentTitle}</span>
        </div>

        <div className={styles.participantsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.statLabel}>Учасники ({participants.length})</span>
          </div>

          {isLoading ? (
            <div className={styles.skeletonList}>
              <Skeleton.Rect height={32} />
              <Skeleton.Rect height={32} />
            </div>
          ) : (
            <div className={styles.participantsList}>
              {participants.map((p) => (
                <div key={p.id} className={styles.participantItem}>
                  <div className={styles.pInfo}>
                    <span className={styles.pName}>
                      {p.userFirstName} {p.userLastName}
                      {p.isCaptain && <span className={styles.captainBadge}>Cap</span>}
                    </span>
                    <span className={styles.pEmail}>{p.userEmail}</span>
                  </div>
                  <div className={styles.pActions}>
                    {!p.isCaptain && (
                      <button
                        className={styles.miniActionBtn}
                        onClick={() => transferCaptainMutation.mutate(p.user)}
                        title='Зробити капітаном'
                      >
                        <PodiumIcon size='xs' />
                      </button>
                    )}
                    <button
                      className={`${styles.miniActionBtn} ${styles.danger}`}
                      onClick={() => removeParticipantMutation.mutate(p.user)}
                      title='Видалити'
                    >
                      <TrashIcon size='xs' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
};

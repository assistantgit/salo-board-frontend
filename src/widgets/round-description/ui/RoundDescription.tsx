import {
  AttachmentsContentBlock,
  RequirementsContentBlock,
  RoundDescriptionBlock,
  useRoundAttachments,
  useRoundDetails,
  useRoundRequirements,
} from '@entities/tournament';
import { Skeleton } from '@shared/ui';
import type React from 'react';
import styles from './RoundDescription.module.css';

interface RoundDescriptionProps {
  tournamentId: number;
  roundId: number;
}

export const RoundDescription: React.FC<RoundDescriptionProps> = ({ tournamentId, roundId }) => {
  const { data: round, isLoading: isRoundLoading } = useRoundDetails(tournamentId, roundId);
  const { data: requirements } = useRoundRequirements(tournamentId, roundId);
  const { data: attachments } = useRoundAttachments(tournamentId, roundId);

  if (isRoundLoading) return <Skeleton className={styles.skeleton} />;
  if (!round) return null;

  return (
    <div className={styles.container}>
      {/* 1. Task Description */}
      <RoundDescriptionBlock description={round.description} />

      {/* 2. Requirements */}
      <RequirementsContentBlock requirements={requirements || []} />

      {/* 3. Attachments */}
      <AttachmentsContentBlock attachments={attachments || []} />
    </div>
  );
};

import {
  AttachmentsContentBlock,
  CriteriaContentBlock,
  RequirementsContentBlock,
  RoundDescriptionBlock,
  useRoundAttachments,
  useRoundCriteria,
  useRoundDetails,
  useRoundRequirements,
} from '@entities/tournament';
import { Skeleton } from '@shared/ui';
import type React from 'react';
import { useParams } from 'react-router-dom';
import styles from './RoundDescription.module.css';

interface RoundDescriptionProps {
  tournamentId?: number;
  roundId?: number;
  /** If true, renders CriteriaContentBlock alongside other blocks */
  withCriteria?: boolean;
}

export const RoundDescription: React.FC<RoundDescriptionProps> = ({
  tournamentId,
  roundId,
  withCriteria = false,
}) => {
  const params = useParams<{
    tournamentId: string;
    roundId: string;
    id: string; // TournamentRoundDetails uses 'id' instead of 'tournamentId'
  }>();

  const tId = tournamentId ?? Number(params.tournamentId ?? params.id);
  const rId = roundId ?? Number(params.roundId);

  const { data: round, isLoading: isRoundLoading } = useRoundDetails(tId, rId);
  const { data: requirements } = useRoundRequirements(tId, rId);
  const { data: attachments } = useRoundAttachments(tId, rId);
  const { data: criteria } = useRoundCriteria(tId, rId);

  if (isRoundLoading) return <Skeleton className={styles.skeleton} />;
  if (!round) return null;

  return (
    <div className={styles.container}>
      {/* 1. Task Description */}
      <RoundDescriptionBlock description={round.description} />

      {/* 2. Criteria — only in evaluation context */}
      {withCriteria && <CriteriaContentBlock criteria={criteria ?? []} />}

      {/* 3. Requirements */}
      {/* Хз не подобається як виглядає */}
      <RequirementsContentBlock requirements={requirements ?? []} />

      {/* 4. Attachments */}
      <AttachmentsContentBlock attachments={attachments ?? []} />
    </div>
  );
};

import { useMemo } from 'react';
import type { RoundDto } from '@entities/tournament';
import type { SubmissionDto } from '../model/team.types';

/**
 * Derives the submission for the active round from already-fetched data.
 * Pure computation — no extra network call.
 */
export function useActiveRoundSubmission(
  activeRound: RoundDto | undefined,
  submissions: SubmissionDto[] | undefined,
): SubmissionDto | null {
  return useMemo(() => {
    if (!activeRound || !submissions) return null;
    return submissions.find((s) => s.round === activeRound.id) ?? null;
  }, [activeRound, submissions]);
}

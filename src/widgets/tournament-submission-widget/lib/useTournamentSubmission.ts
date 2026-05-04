import { useMyTeamInTournament, useTeamSubmissions } from '@entities/team';
import { useRoundDetails, useRoundRequirements, useTournament } from '@entities/tournament';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const useTournamentSubmission = () => {
  const { id, roundId } = useParams<{ id: string; roundId: string }>();

  const tournamentIdNum = Number(id);
  const roundIdNum = Number(roundId);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { tournament, isLoading: isTournamentLoading } = useTournament(tournamentIdNum);
  const { data: round, isLoading: isRoundLoading } = useRoundDetails(tournamentIdNum, roundIdNum);
  const { data: requirements } = useRoundRequirements(tournamentIdNum, roundIdNum);
  const { data: myTeam, isLoading: isTeamLoading } = useMyTeamInTournament(tournamentIdNum);
  const { data: submissions, isLoading: isSubmissionsLoading } = useTeamSubmissions(myTeam?.id);

  const activeSubmission = submissions?.find((s) => s.round === roundIdNum);
  const isLoading = isRoundLoading || isTeamLoading || isSubmissionsLoading || isTournamentLoading;

  return {
    ids: {
      tournamentId: tournamentIdNum,
      roundId: roundIdNum,
    },
    data: {
      tournament,
      round,
      requirements,
      myTeam,
      activeSubmission,
    },
    status: {
      isLoading,
      isSubmitting,
    },
    actions: {
      setIsSubmitting,
    },
  };
};

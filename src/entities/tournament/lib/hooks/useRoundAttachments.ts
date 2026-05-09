import { useQuery } from '@tanstack/react-query';
import { roundApi } from '../../api/roundApi';
import type { RoundAttachmentDto } from '../../model/tournament.types';

export function useRoundAttachments(tournamentId: number | string, roundId: number | string) {
  const tId = Number(tournamentId);
  const rId = Number(roundId);

  return useQuery({
    queryKey: ['round-attachments', tId, rId],
    queryFn: () => {
      if (!tId || !rId) throw new Error('Tournament ID and Round ID are required');
      return roundApi.getRoundAttachments(tId, rId);
    },
    enabled: !!tId && !!rId,
    staleTime: 60_000,
  });
}

export type TournamentStatus = 'DR' | 'RG' | 'RN' | 'FN' | 'AR';

export interface TournamentDomain {
  id: number;
  title: string;
  organizer: string;
  status: TournamentStatus;
  startDate: Date;
  regOpenAt: Date;
  regCloseAt: Date;
  endedAt: Date;
  teamsCount: number | null;
  roundsCount: number;
}

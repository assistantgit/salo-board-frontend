export type TournamentStatus = 'DR' | 'RG' | 'RN' | 'FN' | 'AR';

export interface TournamentDomain {
  id: number;
  title: string;
  description: string;
  rules: string;
  organizer: string;
  organizerName?: string;
  status: TournamentStatus;
  startDate: Date;
  regOpenAt: Date;
  regCloseAt: Date;
  endedAt: Date;
  isTeamVisible?: boolean;
  teamsCount: number | null;
  roundsCount: number;
  minTeamSize?: number;
  maxTeamSize?: number;
  maxTeam?: number;
}

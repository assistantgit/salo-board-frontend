export type TournamentStatus = 'DR' | 'RG' | 'RN' | 'FN' | 'AR';

export type UserTournamentRole = 'participant' | 'jury' | 'admin';

export type RoundStatus = 'DR' | 'AC' | 'SC' | 'EV';

export interface RoundDto {
  id: number;
  title: string;
  description: string;
  orderIndex: number;
  status: RoundStatus;
  startAt: string;
  deadline: string;
  tournament: number;
}

export interface TournamentDto {
  title: string;
  id: number;
  description: string;
  rules: string;
  status: TournamentStatus;
  startDate: string;
  regOpenAt: string;
  regCloseAt: string;
  endedAt: string;
  isTeamVisible?: boolean;
  organizer?: string;
  teamsCount?: number;
  roundsCount?: number;
  minTeamSize?: number;
  maxTeamSize?: number;
  maxTeam?: number;
}

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

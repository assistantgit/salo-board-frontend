export type TournamentStatus = 'DR' | 'RG' | 'RN' | 'FN' | 'AR';

export interface TournamentDomain {
  id: number;
  title: string;
  description: string;
  rules: string;
  organizer: string;
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

export interface KeyDateItem {
  label: string;
  date: string;
  /** 'completed'/'active' = filled dot, 'upcoming' = outlined dot */
  state: 'completed' | 'active' | 'upcoming';
}

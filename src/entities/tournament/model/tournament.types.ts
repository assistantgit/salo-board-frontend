export type TournamentStatus = 'DR' | 'RG' | 'RN' | 'FN' | 'AR';

export type UserTournamentRole = 'participant' | 'jury' | 'admin';

export type RoundStatus = 'DR' | 'AC' | 'SC' | 'EV';

/**
 * Response from GET /api/user/roles
 * Returns boolean flags for each role regarding ACTIVE (Registration, Running) tournaments.
 */
export interface UserRolesDto {
  participant: boolean;
  jury: boolean;
  admin: boolean;
}

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

export interface JuryDto {
  id: number;
  user: number;
  username: string;
  tournament: number;
}

export interface JuryEvaluationDto {
  id: number;
  jury: number;
  juryUsername: string;
  submission: number;
  comment: string;
  status: 'DR' | 'SB';
  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
}

export interface JuryEvaluationsCountDto {
  count: number;
}

export interface LeaderboardCriterionDto {
  criterion: number;
  category: string;
  title: string;
  score: number;
}

export interface LeaderboardRoundDto {
  roundId: number;
  roundTitle: string;
  roundMaxScore: number;
  teamRoundScore: number;
}

export interface TeamLeaderboardRoundDto {
  roundId: number;
  roundTitle: string;
  criterions: LeaderboardCriterionDto[];
}

export interface LeaderboardItemDto {
  teamId: number;
  teamName: string;
  totalScore: number;
  rounds: LeaderboardRoundDto[];
}

export interface RoundAttachmentDto {
  id: number;
  label: string;
  url: string;
  orderIndex: number;
  round: number;
}

export interface EvaluationCriterionDto {
  id: number;
  category: string;
  title: string;
  maxScore: number;
  weight: number;
  orderIndex: number;
  round: number;
}

export interface RoundRequirementDto {
  id: number;
  text: string;
  orderIndex: number;
  round: number;
}

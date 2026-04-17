import type { TournamentStatus } from '../model/tournament.types';

export interface LeaderboardCriterionDto {
  criterionId: number;
  category: string;
  title: string;
  weight: number;
  rawScore: number;
  finalScore: number;
}

export interface LeaderboardRoundDto {
  roundId: number;
  roundTitle: string;
  roundScore: number;
  criterions: LeaderboardCriterionDto[];
}

export interface LeaderboardItemDto {
  teamId: number;
  teamName: string;
  totalScore: number;
  rounds: LeaderboardRoundDto[];
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

export interface TournamentFilters {
  name?: string;
  status?: TournamentStatus;
}

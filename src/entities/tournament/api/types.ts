import type { TournamentStatus, UserTournamentRole } from '../model/tournament.types';

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

export interface TournamentFilters {
  name?: string;
  status?: TournamentStatus;
  role?: UserTournamentRole;
}

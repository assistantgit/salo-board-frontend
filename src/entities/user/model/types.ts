export type UserRole = 'viewer' | 'participant' | 'jury' | 'admin';

export interface UserProfileDto {
  email?: string;
  username?: string;
  inviteCode?: string;
  firstName: string;
  lastName: string;
  city?: string;
  organization?: string;
  telegram?: string;
  discord?: string;
}

export interface UserShortProfileDto {
  firstName: string;
  lastName: string;
}

export type PatchedUserProfileDto = Partial<UserProfileDto>;

export interface UserSubmissionDto {
  id: number;
  round: number;
  team: number;
  teamName: string;
  githubUrl?: string;
  videoUrl?: string;
  demoUrl?: string;
  description?: string;
  status: 'DR' | 'SB' | 'LK';
  createdAt: string;
  submittedAt: string | null;
  // Assume these might be returned for display purposes
  tournamentId?: number;
  tournament?: number;
  roundId?: number;
  tournamentTitle?: string;
  roundTitle?: string;
}

export interface UserTournamentDto {
  id: number;
  title: string;
  description: string;
  status: string;
  startDate: string;
  regOpenAt: string;
  regCloseAt: string;
  endedAt: string;
}

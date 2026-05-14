/**
 * Team enrollment status.
 */
export type TeamStatus = 'RG' | 'DQ' | 'AR';

/**
 * Raw team member data from API.
 */
export interface TeamMemberDto {
  id: string;
  user: number;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  isCaptain: boolean;
}

/**
 * Raw team invitation data from API.
 */
export interface TeamInvitationDto {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
}

/**
 * Raw team data from API.
 */
export interface TeamDto {
  id: number;
  name: string;
  status: TeamStatus;
  tournament: number | { id: number; title?: string; regCloseAt?: string; maxTeamSize?: number };
  maxTeamSize?: number;
}

/**
 * Team domain model.
 */
export interface TeamDomain {
  id: number;
  name: string;
  status: TeamStatus;
  tournamentId: number;
  tournamentTitle?: string;
  regCloseAt?: string;
  maxTeamSize?: number;
  initials: string;
}

export type SubmissionStatus = 'DR' | 'SB' | 'LK';

export interface SubmissionDto {
  id: number;
  round: number;
  team: number;
  teamName: string;
  githubUrl: string;
  videoUrl: string;
  demoUrl: string;
  description: string;
  status: SubmissionStatus;
  createdAt: string;
  submittedAt: string | null;
  updatedAt?: string;
}

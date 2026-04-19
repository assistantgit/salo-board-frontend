/**
 * Team enrollment status.
 */
export type TeamStatus = 'RG' | 'DQ' | 'AR';

/**
 * Raw team data from API.
 */
export interface TeamDto {
    id: number;
    name: string;
    status: TeamStatus;
    tournament: number;
}

/**
 * Team domain model.
 */
export interface TeamDomain {
    id: number;
    name: string;
    status: TeamStatus;
    tournamentId: number;
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
}


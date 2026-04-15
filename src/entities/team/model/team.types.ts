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


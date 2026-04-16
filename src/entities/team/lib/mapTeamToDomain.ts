import type { TeamDto, TeamDomain } from '../model/team.types';

/**
 * Maps TeamDto to TeamDomain.
 */
export function mapTeamToDomain(dto: TeamDto): TeamDomain {
    return {
        id: dto.id,
        name: dto.name,
        status: dto.status,
        tournamentId: dto.tournament,
        initials: getInitials(dto.name),
    };
}

/**
 * Helper to get initials from team name.
 */
function getInitials(name: string): string {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
}

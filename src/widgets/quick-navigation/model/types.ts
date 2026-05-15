import type { TournamentDomain, UserTournamentRole } from '@entities/tournament';

/**
 * Represents one "tab" in the QuickNavigation widget —
 * a role combined with all tournaments the user has under that role.
 */
export interface RoleTab {
  role: UserTournamentRole;
  tournaments: TournamentDomain[];
}

/**
 * Display mode for the widget body:
 * - 'single'  → one tournament, show role-specific detail view
 * - 'list'    → multiple tournaments for the current role, show compact list
 */
export type QuickNavigationDisplayMode = 'single' | 'list';

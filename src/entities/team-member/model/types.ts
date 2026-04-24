export interface TeamMember {
  id: string;
  fullName: string;
  initials: string;
  email?: string;
  role?: string;
  isCurrentUser?: boolean;
  canRemove?: boolean;
}

export interface RegisteredTeamMember {
  name: string;
  email: string;
}

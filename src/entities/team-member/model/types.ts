export interface TeamMember {
  id: string;
  fullName: string;
  isCurrentUser?: boolean;
  isLead?: boolean;
  canBeDeleted?: boolean;
  isPending?: boolean;
  invitationId?: number;
}

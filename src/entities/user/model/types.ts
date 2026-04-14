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


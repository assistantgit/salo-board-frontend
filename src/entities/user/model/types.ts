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

export interface PatchedUserProfileDto extends Partial<UserProfileDto> { }


export interface UserProfileDto {
  firstName: string;
  lastName: string;
  city?: string;
  organization?: string;
  telegram?: string;
  discord?: string;
}

export interface PatchedUserProfileDto extends Partial<UserProfileDto> { }

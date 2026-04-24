import type { RegisteredTeamMember, TeamMember } from '../model/types';

const REGISTERED_TEAM_MEMBER_KEY = 'registered-team-member';

const DEFAULT_TEAM_MEMBER: TeamMember = {
  id: 'default-team-member',
  fullName: 'Новий учасник',
  initials: 'НУ',
  isCurrentUser: true,
};

function getInitials(name: string) {
  const normalizedName = name.trim();

  if (!normalizedName) {
    return '??';
  }

  const parts = normalizedName.split(/\s+/).slice(0, 2);
  const initials = parts.map((part) => part[0]?.toUpperCase() ?? '').join('');

  return initials || normalizedName.slice(0, 2).toUpperCase();
}

export function saveRegisteredTeamMember(member: RegisteredTeamMember) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    REGISTERED_TEAM_MEMBER_KEY,
    JSON.stringify({
      name: member.name.trim(),
      email: member.email.trim(),
    }),
  );
}

export function getRegisteredTeamMember(): TeamMember {
  if (typeof window === 'undefined') {
    return DEFAULT_TEAM_MEMBER;
  }

  const rawValue = window.localStorage.getItem(REGISTERED_TEAM_MEMBER_KEY);

  if (!rawValue) {
    return DEFAULT_TEAM_MEMBER;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<RegisteredTeamMember>;
    const fullName = parsedValue.name?.trim();
    const email = parsedValue.email?.trim();

    if (!fullName || !email) {
      return DEFAULT_TEAM_MEMBER;
    }

    return {
      id: email,
      fullName,
      email,
      initials: getInitials(fullName),
      isCurrentUser: true,
    };
  } catch {
    return DEFAULT_TEAM_MEMBER;
  }
}

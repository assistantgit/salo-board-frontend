export function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return '?';

  const initials = parts
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  return initials;
}

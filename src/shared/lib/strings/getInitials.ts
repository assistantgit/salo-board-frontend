/**
 * Extracts initials from a full name.
 * Handles multiple spaces, limits to 2 characters, and provides a fallback.
 */
export function getInitials(name: string): string {
  const normalizedName = name.trim();

  if (!normalizedName) {
    return '??';
  }

  const parts = normalizedName.split(/\s+/).filter(Boolean).slice(0, 2);

  if (parts.length === 0) {
    return '??';
  }

  const initials = parts.map((part) => part[0]?.toUpperCase() ?? '').join('');

  return initials || normalizedName.slice(0, 2).toUpperCase();
}

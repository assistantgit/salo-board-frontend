/**
 * Formats a date string into a relative time in Ukrainian.
 * Falls back to short absolute date for old items.
 */
export const formatRelativeTime = (createdAt: string): string => {
  if (!createdAt) return '';
  try {
    const date = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return 'щойно';

    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'щойно';
    if (diffMins < 60) return `${diffMins} хв тому`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      if (diffHours === 1 || (diffHours > 20 && diffHours % 10 === 1))
        return `${diffHours} годину тому`;
      if (
        (diffHours >= 2 && diffHours <= 4) ||
        (diffHours > 20 && diffHours % 10 >= 2 && diffHours % 10 <= 4)
      )
        return `${diffHours} години тому`;
      return `${diffHours} годин тому`;
    }

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'вчора';
    if (diffDays < 7) {
      if (diffDays >= 2 && diffDays <= 4) return `${diffDays} дні тому`;
      return `${diffDays} днів тому`;
    }

    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return '';
  }
};

/**
 * Formats a deadline date into a human-readable string.
 * If the deadline is today, returns "До HH:mm".
 * If the deadline is in the future, returns "N дн." or "N год.".
 */
export function formatDeadline(deadline: string | Date | undefined): string {
  if (!deadline) return '—';

  const date = new Date(deadline);
  const now = new Date();
  
  // Calculate difference in milliseconds
  const diff = date.getTime() - now.getTime();
  
  if (diff <= 0) return 'Завершено';

  // Check if it's the same day
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `До ${hours}:${minutes}`;
  }

  // Calculate days remaining
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (days >= 1) {
    return `${days} дн.`;
  }

  // Fallback to hours if less than a day but not "today" (edge cases)
  const hours = Math.ceil(diff / (1000 * 60 * 60));
  return `${hours} год.`;
}

/**
 * Formats an ISO date string to Ukrainian display format.
 * Example: "2026-04-18T14:00:00Z" → "18.04.2026, 14:00"
 */
export function formatSubmissionDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—';

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '—';

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

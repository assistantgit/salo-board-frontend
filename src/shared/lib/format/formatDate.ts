/**
 * Formats a date object to a Ukrainian locale string (e.g., "14 квіт.").
 */
export function formatUkDate(date: Date): string {
  return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
}

/**
 * Formats a user's name according to the "ПІБ" (Прізвище, Ім'я, По батькові) format.
 * `lastName` stores "Прізвище та по батькові", e.g., "Шевченко Григорович"
 * `firstName` stores "Ім'я", e.g., "Тарас"
 * So we split lastName, put firstName in the middle, and join them.
 */
export function formatFullName(firstName?: string | null, lastName?: string | null): string {
  const fName = (firstName || '').trim();
  const lName = (lastName || '').trim();

  if (!lName) return fName;
  if (!fName) return lName;

  const parts = lName.split(/\s+/);
  const surname = parts[0];
  const patronymic = parts.slice(1).join(' ');

  return [surname, fName, patronymic].filter(Boolean).join(' ');
}

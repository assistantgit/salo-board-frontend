export type SubmissionStatus = 'DRAFT' | 'UNRATED' | 'RATED';

export interface Submission {
  id: number;
  tournamentId: number;
  roundId: number;
  tournamentTitle: string;
  roundTitle: string;
  teamName: string;
  status: SubmissionStatus;
  lastModified: string;
}

export interface SubmissionTabItem {
  id: string;
  label: string;
  dotColor?: string;
}

export const SUBMISSION_STATUS_LABELS: Record<SubmissionStatus, string> = {
  DRAFT: 'Чернетка',
  UNRATED: 'Неоцінені',
  RATED: 'Оцінені',
};

/**
 * Centralized color configuration for submission statuses.
 */
export const SUBMISSION_STATUS_COLORS: Record<string, string> = {
  SB: '#469650', // Submitted/Success
  DR: '#666680', // Draft/Neutral
  LK: '#be3638', // Locked/Error
  UNRATED: '#be3638', // For jury view
  RATED: '#2c23d5', // For jury view
};

/**
 * Configuration for History Submission Tabs (Profile).
 */
export const SUBMISSION_HISTORY_TABS: SubmissionTabItem[] = [
  { id: 'ALL', label: 'Всі' },
  { id: 'SB', label: 'Надіслано', dotColor: SUBMISSION_STATUS_COLORS.SB },
  { id: 'DR', label: 'Чернетка', dotColor: SUBMISSION_STATUS_COLORS.DR },
  { id: 'LK', label: 'Заблоковано', dotColor: SUBMISSION_STATUS_COLORS.LK },
];

/**
 * Configuration for Jury Submission Tabs (Jury Dashboard).
 */
export const JURY_SUBMISSION_TABS: SubmissionTabItem[] = [
  { id: 'ALL', label: 'Всі' },
  { id: 'UNRATED', label: 'Неоцінені', dotColor: SUBMISSION_STATUS_COLORS.UNRATED },
  { id: 'DRAFT', label: 'Чернетка', dotColor: SUBMISSION_STATUS_COLORS.SB }, // Green for draft in jury view
  { id: 'RATED', label: 'Оцінені', dotColor: SUBMISSION_STATUS_COLORS.RATED },
];

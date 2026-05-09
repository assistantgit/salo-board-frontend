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

export const SUBMISSION_STATUS_LABELS: Record<SubmissionStatus, string> = {
  DRAFT: 'Чернетка',
  UNRATED: 'Неоцінені',
  RATED: 'Оцінені',
};

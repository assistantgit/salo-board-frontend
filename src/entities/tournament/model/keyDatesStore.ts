import { create } from 'zustand';

interface KeyDatesState {
  lastUpdate: string;
  submissionDate: string;
  setLastUpdate: (date: string) => void;
  setSubmissionDate: (date: string) => void;
}

/**
 * Store for tournament-related key dates.
 * Allows updating values which are then reflected across the UI.
 */
export const useKeyDatesStore = create<KeyDatesState>((set) => ({
  lastUpdate: '',
  submissionDate: '',
  setLastUpdate: (lastUpdate) => set({ lastUpdate }),

  setSubmissionDate: (submissionDate) => set({ submissionDate }),
}));

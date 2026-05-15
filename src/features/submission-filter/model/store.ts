import { create } from 'zustand';

export type SubmissionFilterStatus = 'ALL' | 'UNRATED' | 'DRAFT' | 'RATED';

interface SubmissionFilterState {
  search: string;
  status: SubmissionFilterStatus;
  tournamentId: string;
  roundId: string;
  count: number;
  setSearch: (search: string) => void;
  setStatus: (status: SubmissionFilterStatus) => void;
  setTournamentId: (id: string) => void;
  setRoundId: (id: string) => void;
  setCount: (count: number) => void;
  reset: () => void;
}

export const useSubmissionFilterStore = create<SubmissionFilterState>((set) => ({
  search: '',
  status: 'ALL',
  tournamentId: 'ALL',
  roundId: 'ALL',
  count: -1,
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setTournamentId: (tournamentId) => set({ tournamentId, roundId: 'ALL' }),
  setRoundId: (roundId) => set({ roundId }),
  setCount: (count) => set({ count }),
  reset: () => set({ search: '', status: 'ALL', tournamentId: 'ALL', roundId: 'ALL', count: -1 }),
}));

import { create } from 'zustand';

export type TeamFilterStatus = 'ALL' | 'RG' | 'DQ' | 'AR';

interface TeamFilterState {
  search: string;
  status: TeamFilterStatus;
  tournamentId: string;
  count: number;
  setSearch: (search: string) => void;
  setStatus: (status: TeamFilterStatus) => void;
  setTournamentId: (id: string) => void;
  setCount: (count: number) => void;
  reset: () => void;
}

export const useTeamFilterStore = create<TeamFilterState>((set) => ({
  search: '',
  status: 'ALL',
  tournamentId: 'ALL',
  count: -1,
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setTournamentId: (tournamentId) => set({ tournamentId }),
  setCount: (count) => set({ count }),
  reset: () => set({ search: '', status: 'ALL', tournamentId: 'ALL', count: -1 }),
}));

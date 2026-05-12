import { create } from 'zustand';

export type HistoryFilterStatus = 'ALL' | 'SB' | 'DR' | 'LK' | 'active' | 'completed' | 'AR';
export type HistoryFilterRole = 'ALL' | 'participant' | 'jury' | 'admin';

interface HistoryFilterState {
  search: string;
  status: HistoryFilterStatus;
  role: HistoryFilterRole;
  count: number;
  setSearch: (search: string) => void;
  setStatus: (status: HistoryFilterStatus) => void;
  setRole: (role: HistoryFilterRole) => void;
  setCount: (count: number) => void;
  reset: () => void;
}

export const useHistoryFilterStore = create<HistoryFilterState>((set) => ({
  search: '',
  status: 'ALL',
  role: 'ALL',
  count: -1,
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setRole: (role) => set({ role }),
  setCount: (count) => set({ count }),
  reset: () => set({ search: '', status: 'ALL', role: 'ALL', count: -1 }),
}));

import { create } from 'zustand';
import type { TournamentFilterState } from './types';

/**
 * Zustand store for tournament list filters.
 * Single source of truth for search query and status selection.
 * SRP: manages only filter state, no HTTP or UI concerns.
 */
export const useTournamentFilterStore = create<TournamentFilterState>((set) => ({
  search: '',
  status: 'ALL',
  count: -1,
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setCount: (count) => set({ count }),
  reset: () => set({ search: '', status: 'ALL', count: -1 }),
}));

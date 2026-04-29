import { create } from 'zustand';

interface TournamentStore {
  currentTournamentId: number | null;
  setCurrentTournamentId: (id: number | null) => void;
}

export const useTournamentStore = create<TournamentStore>((set) => ({
  currentTournamentId: null,
  setCurrentTournamentId: (id) => set({ currentTournamentId: id }),
}));

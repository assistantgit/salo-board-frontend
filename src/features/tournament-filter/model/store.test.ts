import { beforeEach, describe, expect, it } from 'vitest';
import { useTournamentFilterStore } from './store';

describe('useTournamentFilterStore', () => {
  beforeEach(() => {
    useTournamentFilterStore.getState().reset();
  });

  it('should have initial state', () => {
    const state = useTournamentFilterStore.getState();
    expect(state.search).toBe('');
    expect(state.status).toBe('ALL');
    expect(state.count).toBe(-1);
  });

  it('should update search query', () => {
    useTournamentFilterStore.getState().setSearch('test');
    expect(useTournamentFilterStore.getState().search).toBe('test');
  });

  it('should update status', () => {
    useTournamentFilterStore.getState().setStatus('RN');
    expect(useTournamentFilterStore.getState().status).toBe('RN');
  });

  it('should reset state correctly', () => {
    useTournamentFilterStore.getState().setSearch('test');
    useTournamentFilterStore.getState().setStatus('RN');
    useTournamentFilterStore.getState().reset();

    const state = useTournamentFilterStore.getState();
    expect(state.search).toBe('');
    expect(state.status).toBe('ALL');
  });
});

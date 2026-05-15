import { beforeEach, describe, expect, it } from 'vitest';
import { useHistoryFilterStore } from './store';

describe('useHistoryFilterStore', () => {
  beforeEach(() => {
    useHistoryFilterStore.getState().reset();
  });

  it('should have initial state', () => {
    const state = useHistoryFilterStore.getState();
    expect(state.search).toBe('');
    expect(state.status).toBe('ALL');
    expect(state.role).toBe('ALL');
    expect(state.count).toBe(-1);
  });

  it('should update search', () => {
    useHistoryFilterStore.getState().setSearch('test query');
    expect(useHistoryFilterStore.getState().search).toBe('test query');
  });

  it('should update status', () => {
    useHistoryFilterStore.getState().setStatus('active');
    expect(useHistoryFilterStore.getState().status).toBe('active');
  });

  it('should update role', () => {
    useHistoryFilterStore.getState().setRole('jury');
    expect(useHistoryFilterStore.getState().role).toBe('jury');
  });

  it('should update count', () => {
    useHistoryFilterStore.getState().setCount(10);
    expect(useHistoryFilterStore.getState().count).toBe(10);
  });

  it('should reset state', () => {
    const store = useHistoryFilterStore.getState();
    store.setSearch('something');
    store.setStatus('completed');
    store.setRole('admin');
    store.setCount(5);

    store.reset();

    const resetState = useHistoryFilterStore.getState();
    expect(resetState.search).toBe('');
    expect(resetState.status).toBe('ALL');
    expect(resetState.role).toBe('ALL');
    expect(resetState.count).toBe(-1);
  });
});

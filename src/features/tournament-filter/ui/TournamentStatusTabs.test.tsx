import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, type Mock, vi } from 'vitest';
import { useTournamentFilterStore } from '../model/store';
import type { TournamentFilterState } from '../model/types';
import { TournamentStatusTabs } from './TournamentStatusTabs';

// Mock the store
vi.mock('../model/store', () => ({
  useTournamentFilterStore: vi.fn(),
}));

describe('TournamentStatusTabs Component', () => {
  it('should render default status tabs', () => {
    (useTournamentFilterStore as unknown as Mock).mockImplementation(
      (selector: (state: Partial<TournamentFilterState>) => unknown) => selector({ status: 'ALL' }),
    );

    render(<TournamentStatusTabs />);

    expect(screen.getByText('Всі')).toBeInTheDocument();
    expect(screen.getByText('Реєстрація відкрита')).toBeInTheDocument();
    expect(screen.getByText('У процесі')).toBeInTheDocument();
    expect(screen.getByText('Закінчений')).toBeInTheDocument();
    expect(screen.getByText('Ще не почався')).toBeInTheDocument();
    expect(screen.queryByText('Архів')).not.toBeInTheDocument();
  });

  it('should render all status tabs in admin variant', () => {
    (useTournamentFilterStore as unknown as Mock).mockImplementation(
      (selector: (state: Partial<TournamentFilterState>) => unknown) => selector({ status: 'ALL' }),
    );

    render(<TournamentStatusTabs variant='admin' />);

    expect(screen.getByText('Всі')).toBeInTheDocument();
    expect(screen.getByText('Архів')).toBeInTheDocument();
  });

  it('should call setStatus when a tab is clicked', () => {
    const setStatus = vi.fn();
    (useTournamentFilterStore as unknown as Mock).mockImplementation(
      (selector: (state: Partial<TournamentFilterState>) => unknown) => {
        const state = {
          status: 'ALL',
          setStatus,
        };
        return selector(state);
      },
    );

    render(<TournamentStatusTabs />);

    fireEvent.click(screen.getByText('У процесі'));
    expect(setStatus).toHaveBeenCalledWith('RN');
  });

  it('should apply active class to the current status tab', () => {
    (useTournamentFilterStore as unknown as Mock).mockImplementation(
      (selector: (state: Partial<TournamentFilterState>) => unknown) => selector({ status: 'RN' }),
    );

    render(<TournamentStatusTabs />);
    const activeTab = screen.getByText('У процесі').closest('button');
    expect(activeTab).toHaveClass(/tabActive/);
  });
});

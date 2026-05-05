import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTournamentFilterStore } from '../model/store';
import { TournamentStatusTabs } from './TournamentStatusTabs';

// Mock the store
vi.mock('../model/store', () => ({
  useTournamentFilterStore: vi.fn(),
}));

describe('TournamentStatusTabs Component', () => {
  it('should render all status tabs', () => {
    (useTournamentFilterStore as unknown as any).mockImplementation((selector: any) =>
      selector({ status: 'ALL' }),
    );

    render(<TournamentStatusTabs />);

    expect(screen.getByText('Всі')).toBeInTheDocument();
    expect(screen.getByText('Реєстрація відкрита')).toBeInTheDocument();
    expect(screen.getByText('У процесі')).toBeInTheDocument();
    expect(screen.getByText('Закінчений')).toBeInTheDocument();
    expect(screen.getByText('Архівний')).toBeInTheDocument();
    expect(screen.getByText('Ще не почався')).toBeInTheDocument();
  });

  it('should call setStatus when a tab is clicked', () => {
    const setStatus = vi.fn();
    (useTournamentFilterStore as unknown as any).mockImplementation((selector: any) => {
      const state = {
        status: 'ALL',
        setStatus,
      };
      return selector(state);
    });

    render(<TournamentStatusTabs />);

    fireEvent.click(screen.getByText('У процесі'));
    expect(setStatus).toHaveBeenCalledWith('RN');
  });

  it('should apply active class to the current status tab', () => {
    (useTournamentFilterStore as unknown as any).mockImplementation((selector: any) =>
      selector({ status: 'RN' }),
    );

    render(<TournamentStatusTabs />);
    const activeTab = screen.getByText('У процесі').closest('button');
    expect(activeTab).toHaveClass(/tabActive/);
  });
});

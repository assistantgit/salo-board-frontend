import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChartBase } from './ChartBase';

describe('ChartBase Component', () => {
  const mockData = [
    { id: '1', label: 'Item 1', value: 50, max: 100 },
    { id: '2', label: 'Item 2', value: 80, max: 100 },
  ];

  it('should render title and data columns', () => {
    render(<ChartBase title='Statistics' data={mockData} />);

    expect(screen.getByText('Statistics')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('50/100')).toBeInTheDocument();
  });

  it('should render nothing if data is empty', () => {
    const { container } = render(<ChartBase data={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render skeleton when loading', () => {
    const { container } = render(<ChartBase data={mockData} isLoading={true} />);
    expect(container.firstChild).toHaveClass(/skeleton/);
  });

  it('should calculate max height correctly based on values', () => {
    render(<ChartBase data={mockData} />);
    // Max value is 100. Item 2 (80) should have 80% height.
    const bar2 = screen.getByText('80').parentElement as HTMLElement;
    expect(bar2.style.height).toBe('80%');
  });
});

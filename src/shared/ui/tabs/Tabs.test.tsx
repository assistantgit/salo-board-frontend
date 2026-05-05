import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Tabs } from './Tabs';

// Mock ResizeObserver
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

describe('Tabs Component', () => {
  const items = [
    { id: '1', label: 'Tab 1' },
    { id: '2', label: 'Tab 2' },
  ];

  beforeEach(() => {
    window.ResizeObserver = ResizeObserverMock as any;
  });

  it('should render all tab labels', () => {
    render(<Tabs items={items} activeId="1" onChange={vi.fn()} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('should apply active class to the current tab', () => {
    render(<Tabs items={items} activeId="2" onChange={vi.fn()} />);
    expect(screen.getByText('Tab 2')).toHaveClass(/active/);
    expect(screen.getByText('Tab 1')).not.toHaveClass(/active/);
  });

  it('should call onChange when a tab is clicked', () => {
    const onChange = vi.fn();
    render(<Tabs items={items} activeId="1" onChange={onChange} />);
    
    fireEvent.click(screen.getByText('Tab 2'));
    expect(onChange).toHaveBeenCalledWith('2');
  });

  it('should apply custom className', () => {
    const { container } = render(<Tabs items={items} activeId="1" onChange={vi.fn()} className="custom-tabs" />);
    expect(container.firstChild).toHaveClass('custom-tabs');
  });
});

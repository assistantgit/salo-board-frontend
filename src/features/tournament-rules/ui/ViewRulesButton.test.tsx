import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ViewRulesButton } from './ViewRulesButton';

describe('ViewRulesButton Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="tournament-rules"></div>';
  });

  it('should render correctly', () => {
    render(<ViewRulesButton />);
    expect(screen.getByText(/Переглянути правила/i)).toBeInTheDocument();
  });

  it('should call scrollIntoView when clicked and element exists', () => {
    const rulesElement = document.getElementById('tournament-rules');
    const scrollIntoViewMock = vi.fn();
    if (rulesElement) {
      rulesElement.scrollIntoView = scrollIntoViewMock;
    }

    render(<ViewRulesButton />);
    fireEvent.click(screen.getByText(/Переглянути правила/i));

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should not throw if element does not exist', () => {
    document.body.innerHTML = '';
    render(<ViewRulesButton />);
    expect(() => {
      fireEvent.click(screen.getByText(/Переглянути правила/i));
    }).not.toThrow();
  });
});

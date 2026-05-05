import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Portal } from './Portal';

describe('Portal Component', () => {
  it('should render children into document.body by default', () => {
    render(
      <Portal>
        <div data-testid="portal-child">Portal Content</div>
      </Portal>
    );

    expect(screen.getByTestId('portal-child')).toBeInTheDocument();
    expect(screen.getByTestId('portal-child').parentElement).toBe(document.body);
  });

  it('should render children into a specified element', () => {
    const customElement = document.createElement('div');
    document.body.appendChild(customElement);

    render(
      <Portal element={customElement}>
        <div data-testid="custom-portal-child">Custom Portal Content</div>
      </Portal>
    );

    expect(screen.getByTestId('custom-portal-child')).toBeInTheDocument();
    expect(screen.getByTestId('custom-portal-child').parentElement).toBe(customElement);
    
    document.body.removeChild(customElement);
  });
});

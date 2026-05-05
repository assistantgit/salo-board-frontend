import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ContentBlock } from './ContentBlock';

describe('ContentBlock Component', () => {
  it('should render title and children', () => {
    render(
      <ContentBlock title="My Title">
        <div data-testid="child">Child Content</div>
      </ContentBlock>
    );

    expect(screen.getByText('My Title')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should toggle content visibility when collapsible', () => {
    render(
      <ContentBlock title="Collapsible" isCollapsible={true} initialOpen={true}>
        <div data-testid="content">Toggle Me</div>
      </ContentBlock>
    );

    const header = screen.getByRole('button', { name: /Згорнути/i });
    
    // Initially open
    expect(screen.getByTestId('content').parentElement?.parentElement?.parentElement).toHaveClass(/contentVisible/);

    // Click to close
    fireEvent.click(header);
    expect(screen.getByTestId('content').parentElement?.parentElement?.parentElement).toHaveClass(/contentHidden/);
    expect(header).toHaveAttribute('aria-label', 'Розгорнути');

    // Click to open again
    fireEvent.click(header);
    expect(screen.getByTestId('content').parentElement?.parentElement?.parentElement).toHaveClass(/contentVisible/);
  });

  it('should not toggle when not collapsible', () => {
    render(
      <ContentBlock title="Static" isCollapsible={false}>
        <div data-testid="content">Static Content</div>
      </ContentBlock>
    );

    const header = screen.getByText('Static');
    fireEvent.click(header);
    
    // Should still be visible
    expect(screen.getByTestId('content').parentElement?.parentElement?.parentElement).toHaveClass(/contentVisible/);
  });

  it('should handle keyboard interaction when collapsible', () => {
    render(
      <ContentBlock title="KB" isCollapsible={true} initialOpen={true}>
        <div data-testid="content">KB Content</div>
      </ContentBlock>
    );

    const header = screen.getByRole('button', { name: /Згорнути/i }).parentElement?.parentElement as HTMLElement;
    
    fireEvent.keyDown(header, { key: 'Enter' });
    expect(screen.getByTestId('content').parentElement?.parentElement?.parentElement).toHaveClass(/contentHidden/);
  });
});

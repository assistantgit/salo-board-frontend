import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SidebarLayout } from './SidebarLayout';

describe('SidebarLayout Component', () => {
  it('should render as aside in desktop mode', () => {
    const { container } = render(
      <SidebarLayout ariaLabel='sidebar'>
        <div>Content</div>
      </SidebarLayout>,
    );

    const aside = container.querySelector('aside');
    expect(aside).toBeInTheDocument();
    expect(aside).toHaveAttribute('aria-label', 'sidebar');
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should render as section in mobile mode', () => {
    const { container } = render(
      <SidebarLayout mobile ariaLabel='mobile-sidebar'>
        <div>Content</div>
      </SidebarLayout>,
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-label', 'mobile-sidebar');
  });
});

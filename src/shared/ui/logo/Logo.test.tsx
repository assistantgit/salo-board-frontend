import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Logo } from './Logo';

describe('Logo Component', () => {
  it('should render link and image', () => {
    render(
      <BrowserRouter>
        <Logo to='/home' />
      </BrowserRouter>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/home');

    const img = screen.getByAltText('Salo Board Logo');
    expect(img).toBeInTheDocument();
  });
});

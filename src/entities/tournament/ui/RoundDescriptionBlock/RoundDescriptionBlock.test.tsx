import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RoundDescriptionBlock } from './RoundDescriptionBlock';

describe('RoundDescriptionBlock Component', () => {
  it('should render title and description', () => {
    render(<RoundDescriptionBlock description='Do X and Y' />);
    expect(screen.getByText('Завдання')).toBeInTheDocument();
    expect(screen.getByText('Do X and Y')).toBeInTheDocument();
  });

  it('should render default message if description is empty', () => {
    render(<RoundDescriptionBlock description='' />);
    expect(screen.getByText(/Опис завдання відсутній/i)).toBeInTheDocument();
  });
});

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BGEllipse } from './BGEllipse';

describe('BGEllipse Component', () => {
  const mockLayerColors = {
    0: '#000000',
    1: '#ff0000',
    2: '#00ff00',
    3: '#0000ff',
  };

  const mockEllipseData = {
    id: 'e1',
    width: 200,
    height: 100,
    offsetX: 100,
    offsetY: 50,
    rotation: 45,
    borderRadius: '40%',
    borderWidth: 3,
    layer: 2 as const,
    zIndex: 1,
  };

  it('should render with correct styles from data', () => {
    const { container } = render(
      <BGEllipse ellipseData={mockEllipseData as any} layerColors={mockLayerColors as any} />,
    );
    const element = container.firstChild as HTMLElement;

    expect(element).toHaveStyle({
      width: '200px',
      height: '100px',
      transform: 'rotate(45deg)',
      border: '3px solid #00ff00',
    });
  });
});

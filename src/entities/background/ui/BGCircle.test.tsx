import type { BGCircleData, BGLayerColors } from '@shared/model';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BGCircle } from './BGCircle';

describe('BGCircle Component', () => {
  const mockLayerColors: BGLayerColors = {
    0: '#000000',
    1: '#ff0000',
    2: '#00ff00',
    3: '#0000ff',
  };

  const mockCircleData: BGCircleData = {
    id: 'circle-1',
    xPercent: 50,
    yPercent: 50,
    ellipses: [
      {
        id: 'ellipse-1',
        width: 100,
        height: 100,
        offsetX: 50,
        offsetY: 50,
        rotation: 0,
        borderRadius: '50%',
        borderWidth: 2,
        layer: 1,
        zIndex: 1,
      },
    ],
  };

  it('should render container with ellipses', () => {
    const { container } = render(
      <BGCircle circleData={mockCircleData} layerColors={mockLayerColors} />,
    );

    // The main container should have width/height 0 as per implementation
    expect(container.firstChild).toHaveStyle({ width: '0px', height: '0px' });
    // Check for the ellipse div. BGCircle renders a div, which contains BGEllipse (another div)
    const ellipses = container.firstChild?.childNodes;
    expect(ellipses).toHaveLength(1);
  });

  it('should apply custom className and additional styles', () => {
    const { container } = render(
      <BGCircle
<<<<<<< feature/174
        circleData={mockCircleData}
        layerColors={mockLayerColors}
=======
        circleData={mockCircleData as unknown as Parameters<typeof BGCircle>[0]['circleData']}
        layerColors={mockLayerColors as unknown as Parameters<typeof BGCircle>[0]['layerColors']}
>>>>>>> develop
        className='custom-bg'
        style={{ zIndex: 10 }}
      />,
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-bg');
    expect(element.style.zIndex).toBe('10');
  });
});

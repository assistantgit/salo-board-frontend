import { memo } from 'react';
import type { EllipseData, LayerColors } from '@shared/model';

interface EllipseProps {
  ellipseData: EllipseData;
  layerColors: LayerColors;
}

/**
 * Single decorative ellipse ring.
 * Memoised — re-renders only when `ellipseData` or `layerColors` reference changes.
 */
export const Ellipse = memo(function Ellipse({ ellipseData, layerColors }: EllipseProps) {
  return (
    <div
      style={{
        position:     'absolute',
        width:        ellipseData.width,
        height:       ellipseData.height,
        left:         ellipseData.offsetX - ellipseData.width  / 2,
        top:          ellipseData.offsetY - ellipseData.height / 2,
        transform:    `rotate(${ellipseData.rotation}deg)`,
        borderRadius: ellipseData.borderRadius,
        border:       `${ellipseData.borderWidth}px solid ${layerColors[ellipseData.layer]}`,
        background:   'none',
        boxSizing:    'border-box',
        willChange:   'transform',
      }}
    />
  );
});

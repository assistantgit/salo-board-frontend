import type { BGEllipseData, BGLayerColors } from '@shared/model';
import { memo } from 'react';

interface BGEllipseProps {
  ellipseData: BGEllipseData;
  layerColors: BGLayerColors;
}

/** Single decorative ellipse ring. */
export const BGEllipse = memo(function BGEllipse({ ellipseData, layerColors }: BGEllipseProps) {
  return (
    <div
      style={{
        position: 'absolute',
        width: ellipseData.width,
        height: ellipseData.height,
        left: ellipseData.offsetX - ellipseData.width / 2,
        top: ellipseData.offsetY - ellipseData.height / 2,
        transform: `rotate(${ellipseData.rotation}deg)`,
        borderRadius: ellipseData.borderRadius,
        border: `${ellipseData.borderWidth}px solid ${layerColors[ellipseData.layer]}`,
        background: 'none',
        boxSizing: 'border-box',
        willChange: 'transform',
      }}
    />
  );
});

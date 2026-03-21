import { memo, useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { BGCircleData, BGLayerColors } from '@shared/model';
import { BGEllipse } from './BGEllipse';

interface BGCircleProps {
  circleData:  BGCircleData;
  layerColors: BGLayerColors;
  style?:      CSSProperties;
  className?:  string;
}

/** Concentric ellipse rings for one decorative circle. Sorted by zIndex on mount. */
export const BGCircle = memo(function BGCircle({
  circleData,
  layerColors,
  style = {},
  className = '',
}: BGCircleProps) {
  const sortedEllipses = useMemo(
    () =>
      [...circleData.ellipses].sort(
        (a, b) => (a.zIndex ?? a.layer) - (b.zIndex ?? b.layer),
      ),
    [circleData.ellipses],
  );

  return (
    <div className={className} style={{ width: 0, height: 0, ...style }}>
      {sortedEllipses.map((ellipseData) => (
        <BGEllipse key={ellipseData.id} ellipseData={ellipseData} layerColors={layerColors} />
      ))}
    </div>
  );
});

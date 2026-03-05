import { memo, useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { CircleData, LayerColors } from '@shared/model';
import { Ellipse } from './Ellipse';

interface BGCircleProps {
  circleData:  CircleData;
  layerColors: LayerColors;
  style?:      CSSProperties;
  className?:  string;
}

/**
 * A group of concentric `Ellipse` rings representing one decorative circle.
 *
 * `useMemo` — ellipses are sorted by `zIndex` (fallback: `layer`) only when
 * the `circleData.ellipses` array reference changes.
 */
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
        <Ellipse key={ellipseData.id} ellipseData={ellipseData} layerColors={layerColors} />
      ))}
    </div>
  );
});

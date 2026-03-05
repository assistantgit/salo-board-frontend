import { memo, useMemo } from 'react';
import type { BGConfig, LayerColors } from '@shared/model';
import { BGCircle } from './BGCircle';
import { BGImage }  from './BGImage';

interface BGLayerProps {
  bgConfig:    BGConfig;
  layerColors: LayerColors;
}

/**
 * The visual layer that holds all decorative circles and images.
 * Positioned absolute, `pointer-events: none`, hidden from a11y tree.
 *
 * `useMemo` — circle nodes and image nodes are only rebuilt when the
 * corresponding arrays in `bgConfig` actually change.
 */
export const BGLayer = memo(function BGLayer({ bgConfig, layerColors }: BGLayerProps) {
  const circleNodes = useMemo(
    () =>
      bgConfig.circles.map((circleData) => (
        <div
          key={circleData.id}
          style={{
            position: 'absolute',
            left:     `${circleData.xPercent}%`,
            top:      `${circleData.yPercent}%`,
          }}
        >
          <BGCircle circleData={circleData} layerColors={layerColors} />
        </div>
      )),
    [bgConfig.circles, layerColors],
  );

  const imageNodes = useMemo(
    () =>
      (bgConfig.images ?? []).map((imageData) => (
        <BGImage key={imageData.id} imageData={imageData} />
      )),
    [bgConfig.images],
  );

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {circleNodes}
      {imageNodes}
    </div>
  );
});

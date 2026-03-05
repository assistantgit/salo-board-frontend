import { memo, useMemo } from 'react';
import type { BGConfig, BGLayerColors } from '@shared/model';
import { BGCircle } from './BGCircle';
import { BGImage }  from './BGImage';

interface BGLayerProps {
  bgConfig:    BGConfig;
  layerColors: BGLayerColors;
}

/** Absolutely-positioned decorative layer — holds all circles and images. */
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

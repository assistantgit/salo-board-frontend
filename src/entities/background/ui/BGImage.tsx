import { memo } from 'react';
import type { ImageData } from '@shared/model';
import { resolveImageSrc } from '../lib/resolveImageSrc';

interface BGImageProps {
  imageData: ImageData;
}

/**
 * Absolutely-positioned decorative image inside a BGLayer.
 * Memoised — pointer-events and user-select disabled so it never
 * interferes with content above.
 */
export const BGImage = memo(function BGImage({ imageData }: BGImageProps) {
  return (
    <div
      style={{
        position:        'absolute',
        left:            `${imageData.xPercent}%`,
        top:             `${imageData.yPercent}%`,
        width:           imageData.width,
        height:          imageData.height,
        transform:       `translate(-50%, -50%) rotate(${imageData.rotation ?? 0}deg)`,
        transformOrigin: 'center center',
        opacity:         imageData.opacity ?? 1,
      }}
    >
      <img
        src={resolveImageSrc(imageData.src)}
        alt=""
        style={{
          width:         '100%',
          height:        '100%',
          objectFit:     'cover',
          display:       'block',
          userSelect:    'none',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
});

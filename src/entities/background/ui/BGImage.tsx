import type { BGImageData } from '@shared/model';
import { memo } from 'react';
import { resolveImageSrc } from '../lib/resolveImageSrc';

interface BGImageProps {
  imageData: BGImageData;
}

/** Absolutely-positioned decorative image. Non-interactive, hidden from a11y tree. */
export const BGImage = memo(function BGImage({ imageData }: BGImageProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${imageData.xPercent}%`,
        top: `${imageData.yPercent}%`,
        width: imageData.width,
        height: imageData.height,
        transform: `translate(-50%, -50%) rotate(${imageData.rotation ?? 0}deg)`,
        transformOrigin: 'center center',
        opacity: imageData.opacity ?? 1,
      }}
    >
      <img
        src={resolveImageSrc(imageData.src)}
        alt=''
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
});

import type { BGCircleData, BGConfig, BGLayerColors } from '@shared/model';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BGCircle } from './BGCircle';
import { BGImage } from './BGImage';

interface BGLayerProps {
  bgConfig: BGConfig;
  layerColors: BGLayerColors;
}

const MOBILE_BREAKPOINT = 768;
const DEFAULT_TILE_HEIGHT = 800;
const DEFAULT_MOBILE_MAX_CIRCLES = 2;

function useContainerHeight(ref: React.RefObject<HTMLDivElement | null>): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial measurement
    setHeight(el.offsetHeight);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setHeight(entry.contentRect.height);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return height;
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BREAKPOINT);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

/** Absolutely-positioned decorative layer — holds all circles and images.
 *  Repeats the pattern vertically to cover the full container height.
 *  On mobile, limits the number of circles per tile to reduce visual clutter.
 */
export const BGLayer = memo(function BGLayer({ bgConfig, layerColors }: BGLayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerHeight = useContainerHeight(wrapperRef);
  const isMobile = useIsMobile();

  const tileHeight = bgConfig.tileHeight ?? DEFAULT_TILE_HEIGHT;
  const tileGap = bgConfig.tileGap ?? 0;
  const stride = tileHeight + tileGap;
  const mobileMaxCircles = bgConfig.mobileMaxCircles ?? DEFAULT_MOBILE_MAX_CIRCLES;

  // How many tiles we need to cover the full container height
  const tileCount = useMemo(() => {
    if (containerHeight <= 0) return 1;
    return Math.ceil(containerHeight / stride) + 1;
  }, [containerHeight, stride]);

  // On mobile: take only the first N circles (least cluttered)
  const visibleCircles: BGCircleData[] = useMemo(
    () => (isMobile ? bgConfig.circles.slice(0, mobileMaxCircles) : bgConfig.circles),
    [isMobile, bgConfig.circles, mobileMaxCircles],
  );

  const mobileScale = bgConfig.mobileScale ?? 1;

  const renderTile = useCallback(
    (tileIndex: number) =>
      visibleCircles.map((circleData) => (
        <div
          key={`${tileIndex}-${circleData.id}`}
          style={{
            position: 'absolute',
            left: `${circleData.xPercent}%`,
            // Each tile occupies tileHeight px within stride; circles stay within [0, tileHeight]
            top: tileIndex * stride + (circleData.yPercent / 100) * tileHeight,
            transform: isMobile && mobileScale !== 1 ? `scale(${mobileScale})` : undefined,
            transformOrigin: 'center center',
          }}
        >
          <BGCircle circleData={circleData} layerColors={layerColors} />
        </div>
      )),
    [visibleCircles, tileHeight, stride, layerColors, isMobile, mobileScale],
  );

  const tiles = useMemo(
    () => Array.from({ length: tileCount }, (_, i) => renderTile(i)),
    [tileCount, renderTile],
  );

  const renderImageTile = useCallback(
    (tileIndex: number) =>
      (bgConfig.images ?? []).map((imageData) => (
        <BGImage
          key={`${tileIndex}-${imageData.id}`}
          imageData={imageData}
          tileTop={tileIndex * stride + (imageData.yPercent / 100) * tileHeight}
        />
      )),
    [bgConfig.images, tileHeight, stride],
  );

  const imageTiles = useMemo(
    () => Array.from({ length: tileCount }, (_, i) => renderImageTile(i)),
    [tileCount, renderImageTile],
  );

  return (
    <div
      ref={wrapperRef}
      aria-hidden='true'
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {tiles}
      {imageTiles}
    </div>
  );
});

export interface BGEllipseData {
  id: string;
  /** Color layer index: 0 = subtle, 1 = mid, 2 = accent */
  layer: 0 | 1 | 2;
  zIndex: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
  borderRadius: string;
  borderWidth: number;
}

export interface BGCircleData {
  id: string;
  xPercent: number;
  yPercent: number;
  ellipses: BGEllipseData[];
}

export interface BGImageData {
  id: string;
  src: string;
  xPercent: number;
  yPercent: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}

/** Maps layer index → CSS color string */
export type BGLayerColors = {
  0: string;
  1: string;
  2: string;
};

export interface BGConfig {
  colors?: Partial<BGLayerColors>;
  circles: BGCircleData[];
  images?: BGImageData[];
  /**
   * Height in pixels of one repeating pattern tile.
   * When the container is taller than this value the pattern repeats.
   * Default: 800.
   */
  tileHeight?: number;
  /**
   * Gap in pixels between tile repetitions (empty space with no circles).
   * The actual stride between tile starts is tileHeight + tileGap.
   * Default: 0.
   */
  tileGap?: number;
  /**
   * Maximum number of circles to render per tile on mobile screens (≤ 768 px).
   * Reduces visual clutter on small screens.
   * Default: 2.
   */
  mobileMaxCircles?: number;
  /**
   * CSS scale factor applied to each circle on mobile screens (≤ 768 px).
   * E.g. 0.55 renders circles at 55% of their desktop size.
   * Default: 1 (no scaling).
   */
  mobileScale?: number;
}

export interface BGTheme {
  bgColor?: string;
  colors?: Partial<BGLayerColors>;
}

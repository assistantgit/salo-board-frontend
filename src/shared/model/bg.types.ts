// ── Background domain types ────────────────────────────────────────

export interface EllipseData {
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

export interface CircleData {
  id: string;
  xPercent: number;
  yPercent: number;
  ellipses: EllipseData[];
}

export interface ImageData {
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
export type LayerColors = {
  0: string;
  1: string;
  2: string;
};

export interface BGConfig {
  colors?: Partial<LayerColors>;
  circles: CircleData[];
  images?: ImageData[];
}

export interface BGTheme {
  bgColor?: string;
  colors?: Partial<LayerColors>;
}

import { memo, useMemo } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { BGConfig, BGTheme, BGLayerColors } from '@shared/model';
import { DEFAULT_COLORS, BG_COLOR } from '@entities/background';
import { BGLayer } from '@entities/background';

interface BGLayoutProps {
  bgConfig:   BGConfig;
  /** Per-page color overrides. Omit to use CSS vars from globals.css. */
  bgTheme?:   BGTheme;
  children?:  ReactNode;
  style?:     CSSProperties;
  className?: string;
}

/**
 * Root background layout — renders a decorative BGLayer behind children.
 * Color priority (highest wins): bgConfig.colors > bgTheme.colors > DEFAULT_COLORS
 */
export const BGLayout = memo(function BGLayout({
  bgConfig,
  bgTheme,
  children,
  style = {},
  className = '',
}: BGLayoutProps) {
  const layerColors: BGLayerColors = useMemo(
    () => ({
      ...DEFAULT_COLORS,
      ...(bgTheme?.colors ?? {}),
      ...(bgConfig.colors ?? {}),
    } as BGLayerColors),
    [bgTheme?.colors, bgConfig.colors],
  );

  const bgColor = useMemo(
    () => bgTheme?.bgColor ?? BG_COLOR,
    [bgTheme?.bgColor],
  );

  return (
    <div
      className={className}
      style={{
        position:   'relative',
        background: bgColor,
        overflow:   'hidden',
        ...style,
      }}
    >
      <BGLayer bgConfig={bgConfig} layerColors={layerColors} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
});

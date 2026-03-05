import { memo, useMemo } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { BGConfig, BGTheme, LayerColors } from '@shared/model';
import { DEFAULT_COLORS, BG_COLOR } from '../config/defaults';
import { BGLayer } from './BGLayer';

interface BGLayoutProps {
  bgConfig:   BGConfig;
  bgTheme?:   BGTheme;
  children?:  ReactNode;
  style?:     CSSProperties;
  className?: string;
}

/**
 * Root background layout component.
 *
 * Renders a decorative `BGLayer` behind `children` content.
 * Supports per-instance color overrides via `bgTheme` and `bgConfig.colors`.
 *
 * Color priority (highest wins): bgConfig.colors > bgTheme.colors > DEFAULT_COLORS
 * DEFAULT_COLORS itself points to CSS vars in globals.css — one place to edit.
 *
 * `useMemo`:
 *  - `layerColors` — merged only when `bgTheme.colors` or `bgConfig.colors` changes
 *  - `bgColor`     — resolved only when `bgTheme.bgColor` changes
 */
export const BGLayout = memo(function BGLayout({
  bgConfig,
  bgTheme,
  children,
  style = {},
  className = '',
}: BGLayoutProps) {
  const layerColors: LayerColors = useMemo(
    () => ({
      ...DEFAULT_COLORS,
      ...(bgTheme?.colors  ?? {}),
      ...(bgConfig.colors  ?? {}),
    } as LayerColors),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

import { BG_COLOR, BGLayer, DEFAULT_COLORS } from '@entities/background';
import type { BGConfig, BGLayerColors, BGTheme } from '@shared/model';
import type { CSSProperties, ReactNode } from 'react';
import { memo, useMemo } from 'react';

interface BGLayoutProps {
  bgConfig: BGConfig;
  bgTheme?: BGTheme;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export const BGLayout = memo(function BGLayout({
  bgConfig,
  bgTheme,
  children,
  style = {},
  className = '',
}: BGLayoutProps) {
  const layerColors: BGLayerColors = useMemo(
    () =>
      ({
        ...DEFAULT_COLORS,
        ...(bgTheme?.colors ?? {}),
        ...(bgConfig.colors ?? {}),
      }) as BGLayerColors,
    [bgTheme?.colors, bgConfig.colors],
  );

  const bgColor = useMemo(() => bgTheme?.bgColor ?? BG_COLOR, [bgTheme?.bgColor]);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        background: bgColor,
        ...style,
      }}
    >
      {/* Isolate background circles to prevent page-level overflow without breaking sticky positioning of content */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <BGLayer bgConfig={bgConfig} layerColors={layerColors} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
});

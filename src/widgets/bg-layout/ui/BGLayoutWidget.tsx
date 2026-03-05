import type { CSSProperties, ReactNode } from 'react';
import { BGLayout } from '@entities/background';
import type { BGConfig, BGTheme } from '@shared/model';

interface BGLayoutWidgetProps {
  bgConfig:   BGConfig;
  /** Per-instance overrides. Omit to use app theme tokens from globals.css. */
  bgTheme?:   BGTheme;
  children?:  ReactNode;
  style?:     CSSProperties;
  className?: string;
}

/**
 * **BGLayoutWidget** — FSD widget layer.
 *
 * Thin adapter over the `BGLayout` entity.
 * The light ↔ dark color switch is fully handled by CSS variables in globals.css
 * (`--color-bg`, `--color-bg-layer-0/1/2`) — no JS theme reading needed here.
 *
 * Use `bgTheme` only when you need to override colors for a specific page/section.
 */
export function BGLayoutWidget({
  bgConfig,
  bgTheme,
  children,
  style,
  className,
}: BGLayoutWidgetProps) {
  return (
    <BGLayout
      bgConfig={bgConfig}
      bgTheme={bgTheme}
      style={style}
      className={className}
    >
      {children}
    </BGLayout>
  );
}

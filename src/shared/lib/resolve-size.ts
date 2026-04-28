import { ICON_SIZE_MAP } from '@shared/config';
import type { IconSize, IconSizePreset } from '@shared/model';

function isPreset(size: IconSize): size is IconSizePreset {
  return typeof size === 'string';
}

export function resolveSize(size: IconSize): string {
  if (isPreset(size)) return ICON_SIZE_MAP[size];
  return `${size}rem`;
}

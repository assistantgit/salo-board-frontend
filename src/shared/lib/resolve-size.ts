import { ICON_SIZE_MAP } from '@shared/config/icon_size-map'
import type { IconSize, IconSizePreset } from '../model/icon.types'

function isPreset(size: IconSize): size is IconSizePreset {
  return typeof size === 'string'
}

export function resolveSize(size: IconSize): string {
  if (isPreset(size)) return ICON_SIZE_MAP[size]
  return `${size}rem`
}
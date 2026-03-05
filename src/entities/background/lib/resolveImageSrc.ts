const ASSETS_BASE = '/assets';

export function resolveImageSrc(src: string): string {
  if (src.startsWith('/') || src.startsWith('http')) return src;
  return `${ASSETS_BASE}/${src}`;
}

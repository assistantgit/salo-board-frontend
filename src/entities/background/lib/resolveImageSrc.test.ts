import { describe, expect, it } from 'vitest';
import { resolveImageSrc } from './resolveImageSrc';

describe('resolveImageSrc', () => {
  it('should return src as is if it starts with a slash', () => {
    expect(resolveImageSrc('/my-image.jpg')).toBe('/my-image.jpg');
  });

  it('should return src as is if it starts with http', () => {
    expect(resolveImageSrc('http://example.com/img.png')).toBe('http://example.com/img.png');
    expect(resolveImageSrc('https://example.com/img.png')).toBe('https://example.com/img.png');
  });

  it('should prefix src with /assets if it is a relative path', () => {
    expect(resolveImageSrc('paper.svg')).toBe('/assets/paper.svg');
    expect(resolveImageSrc('backgrounds/dark.png')).toBe('/assets/backgrounds/dark.png');
  });
});

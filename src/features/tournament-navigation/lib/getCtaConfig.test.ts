import { describe, expect, it } from 'vitest';
import { getCtaConfig } from './getCtaConfig';

describe('getCtaConfig utility', () => {
  it('should return correct config for FN status', () => {
    const config = getCtaConfig('FN');
    expect(config.label).toBe('Переглянути результати');
    expect(config.href(123)).toBe('/tournaments/123/leaderboard');
  });

  it('should return correct config for RG status', () => {
    const config = getCtaConfig('RG');
    expect(config.label).toBe('Перейти до реєстрації');
    expect(config.href(1)).toBe('/tournaments/1/register');
  });

  it('should return correct config for RN status', () => {
    const config = getCtaConfig('RN');
    expect(config.label).toBe('Перейти до турніру');
    expect(config.href(5)).toBe('/tournaments/5');
  });
});

import { describe, expect, it } from 'vitest';
import { confirmPasswordRules, emailRules, nameRules, passwordRules } from './fieldRules';

describe('fieldRules', () => {
  it('should export email rules with correct regex', () => {
    expect(emailRules.required).toBeDefined();
    expect(emailRules.pattern.value).toBeInstanceOf(RegExp);
    expect(emailRules.pattern.value.test('test@example.com')).toBe(true);
    expect(emailRules.pattern.value.test('invalid-email')).toBe(false);
  });

  it('should export password rules', () => {
    expect(passwordRules.required).toBeDefined();
    expect(passwordRules.minLength.value).toBe(8);
    expect(passwordRules.maxLength.value).toBe(64);
  });

  it('should export name rules', () => {
    expect(nameRules.required).toBeDefined();
    expect(nameRules.minLength.value).toBe(2);
    expect(nameRules.maxLength.value).toBe(50);
    expect(nameRules.pattern.value.test('Іван')).toBe(true);
    expect(nameRules.pattern.value.test('John123')).toBe(false);
  });

  it('should export confirm password rules', () => {
    expect(confirmPasswordRules.required).toBeDefined();
  });
});

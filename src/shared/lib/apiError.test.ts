import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { applyFieldErrors } from './apiError';

interface TestForm extends FieldValues {
  email: string;
  password: string;
}

describe('applyFieldErrors', () => {
  it('should return network error message if no response', () => {
    const err = { response: undefined };
    const setError = vi.fn() as unknown as UseFormSetError<TestForm>;
    const result = applyFieldErrors(err, setError, []);
    expect(result).toBe("Помилка мережі. Перевірте з'єднання.");
  });

  it('should return translated detail message if present', () => {
    const err = {
      response: {
        data: { detail: 'No active account found with the given credentials' },
      },
    };
    const result = applyFieldErrors(err, vi.fn() as unknown as UseFormSetError<TestForm>, []);
    expect(result).toBe('Невірний логін або пароль.');
  });

  it('should return raw detail message if no translation', () => {
    const err = {
      response: {
        data: { detail: 'Some unknown error' },
      },
    };
    const result = applyFieldErrors(err, vi.fn() as unknown as UseFormSetError<TestForm>, []);
    expect(result).toBe('Some unknown error');
  });

  it('should map field errors to react-hook-form setError', () => {
    const err = {
      response: {
        data: {
          email: ['This field is required.'],
          password: ['Ensure this value has at least 8 characters.'],
        },
      },
    };
    const setError = vi.fn() as unknown as UseFormSetError<TestForm>;
    const result = applyFieldErrors(err, setError, ['email', 'password'] as Path<TestForm>[]);

    expect(setError).toHaveBeenCalledWith('email', {
      type: 'server',
      message: "Це поле є обов'язковим.",
    });
    expect(setError).toHaveBeenCalledWith('password', {
      type: 'server',
      message: 'Мінімум 8 символів.',
    });
    expect(result).toBeNull(); // returns null if field errors were handled
  });

  it('should return fallback message if nothing matched', () => {
    const err = {
      response: {
        data: { unknown_field: ['Error'] },
      },
    };
    const result = applyFieldErrors(
      err,
      vi.fn() as unknown as UseFormSetError<TestForm>,
      ['email'] as Path<TestForm>[],
    );
    expect(result).toBe('Щось пішло не так. Спробуйте ще раз.');
  });
});

import { renderHook } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { useEvaluationParams } from './useEvaluationParams';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

describe('useEvaluationParams', () => {
  it('should parse numeric parameters correctly', () => {
    vi.mocked(useParams).mockReturnValue({
      tournamentId: '1',
      roundId: '2',
      submissionId: '3',
    });

    const { result } = renderHook(() => useEvaluationParams());

    expect(result.current.tournamentId).toBe(1);
    expect(result.current.roundId).toBe(2);
    expect(result.current.submissionId).toBe(3);
    expect(result.current.isValid).toBe(true);
  });

  it('should return isValid false if any parameter is missing or not a number', () => {
    vi.mocked(useParams).mockReturnValue({
      tournamentId: '1',
      roundId: 'abc',
      submissionId: '3',
    });

    const { result } = renderHook(() => useEvaluationParams());

    expect(result.current.roundId).toBeNaN();
    expect(result.current.isValid).toBe(false);
  });

  it('should handle empty parameters', () => {
    vi.mocked(useParams).mockReturnValue({});

    const { result } = renderHook(() => useEvaluationParams());

    expect(result.current.tournamentId).toBeNaN();
    expect(result.current.isValid).toBe(false);
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { copyToClipboard } from './copyToClipboard';

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });
  });

  it('should return false if text is empty', async () => {
    const result = await copyToClipboard('');
    expect(result).toBe(false);
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
  });

  it('should return true when text is successfully copied', async () => {
    vi.mocked(navigator.clipboard.writeText).mockResolvedValue(undefined);

    const result = await copyToClipboard('test text');

    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
  });

  it('should return false and log error when copying fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Clipboard error');
    vi.mocked(navigator.clipboard.writeText).mockRejectedValue(error);

    const result = await copyToClipboard('fail text');

    expect(result).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to copy text: ', error);

    consoleSpy.mockRestore();
  });
});

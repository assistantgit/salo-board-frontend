import '@testing-library/jest-dom';

// Mock IntersectionObserver
const IntersectionObserverMock = vi.fn().mockImplementation(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

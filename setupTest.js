/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

global.IS_REACT_ACT_ENVIRONMENT = true;

Object.defineProperty(global, "CSS", {
  writable: true,
  value: {
    supports: vi.fn(),
  },
});

Object.defineProperty(global, "ResizeObserver", {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  })),
});

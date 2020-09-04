import "jest-styled-components";
Object.defineProperty(window, "CSS", {
  writable: true,
  value: {
    supports: jest.fn(),
  },
});

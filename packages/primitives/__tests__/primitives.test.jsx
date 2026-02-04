import * as primitives from "../src";

describe("primitives", () => {
  test("primitives snapshot", () => {
    expect(primitives).toBeDefined();
    expect(Object.keys(primitives).length).toBeGreaterThan(0);
  });
});

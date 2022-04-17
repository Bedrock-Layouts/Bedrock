import * as primitives from "../src";

describe("primitives", () => {
  test("primitives snapshot", () => {
    expect(primitives).toMatchSnapshot();
  });
});

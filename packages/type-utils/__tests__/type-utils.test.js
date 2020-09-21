import React from "react";

import { forwardRefWithAs } from "../src";

jest.mock("react", () => ({
  forwardRef: jest.fn(),
}));

describe("forwardRefWithAs", () => {
  test("forwardRefWithAs is not null", () => {
    expect(forwardRefWithAs).toBeTruthy();
  });

  it("should call React.forwardRef", () => {
    forwardRefWithAs(() => null);

    expect(React.forwardRef.mock.calls.length).toBe(1);
  });
});

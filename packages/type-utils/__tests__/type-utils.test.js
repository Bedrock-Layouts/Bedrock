import * as React from "react";
import { vi } from "vitest";

import { forwardRefWithAs } from "../src";

vi.mock("react", () => ({
  forwardRef: vi.fn(),
}));

describe("forwardRefWithAs", () => {
  test("forwardRefWithAs is not null", () => {
    expect(forwardRefWithAs).toBeTruthy();
  });

  it("should call React.forwardRef", () => {
    forwardRefWithAs(() => null);

    expect(React.forwardRef).toBeCalled();
  });
});

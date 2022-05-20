import useStatefulRef from "@bedrock-layout/use-stateful-ref";
import * as React from "react";
import ReactDOM from "react-dom/";
import { act } from "react-dom/test-utils";
import { it, vi } from "vitest";

import useForwardedRef from "../src";

vi.mock("@bedrock-layout/use-stateful-ref", () => ({
  default: vi.fn(() => {
    let value = undefined;
    return {
      set current(val) {
        value = val;
      },
      get current() {
        return value;
      },
    };
  }),
}));

let safeRef;
const HookWrapper = React.forwardRef(({ isStateful }, ref) => {
  const config = isStateful === undefined ? undefined : { isStateful };
  safeRef = useForwardedRef(ref, config);
  safeRef.current = "safeRef:current";
  return null;
});

describe("useForwardedRef", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    safeRef = undefined;

    document.body.removeChild(container);
    container = null;
  });

  test("useForwardedRef is not null", () => {
    expect(useForwardedRef).toBeTruthy();
  });

  test("useStatefulRef is called", () => {
    act(() => {
      ReactDOM.render(<HookWrapper />, container);
    });

    expect(useStatefulRef).toBeCalled();
    expect(safeRef).toMatchSnapshot();
  });

  it("should call ref callback", () => {
    const ref = vi.fn();
    act(() => {
      ReactDOM.render(<HookWrapper ref={ref} />, container);
    });
    expect(ref).toBeCalled();
  });

  it("should update a ref object", () => {
    const ref = { current: undefined };
    act(() => {
      ReactDOM.render(<HookWrapper ref={ref} />, container);
    });
    expect(ref).toMatchSnapshot();
  });
});

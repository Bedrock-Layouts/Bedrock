import useStatefulRef from "@bedrock-layout/use-stateful-ref";
import React from "react";
import ReactDOM from "react-dom/";
import { act } from "react-dom/test-utils";

import useForwardedRef from "../src";

jest.mock("@bedrock-layout/use-stateful-ref", () =>
  jest.fn(() => {
    let value = undefined;
    return {
      set current(val) {
        value = val;
      },
      get current() {
        return value;
      },
    };
  })
);

let safeRef;
const HookWrapper = React.forwardRef((_, ref) => {
  safeRef = useForwardedRef(ref);
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
    const ref = jest.fn();
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

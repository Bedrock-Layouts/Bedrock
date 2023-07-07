import { useStatefulRef } from "@bedrock-layout/use-stateful-ref";
import * as React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";

import * as imports from "../src";

const { useForwardedRef } = imports;

vi.mock("@bedrock-layout/use-stateful-ref", () => {
  const fn = vi.fn(() => {
    let value: unknown = undefined;
    return {
      set current(val) {
        value = val;
      },
      get current() {
        return value;
      },
    };
  });
  return {
    default: fn,
    useStatefulRef: fn,
  };
});

let safeRef: React.MutableRefObject<unknown> | undefined;
const HookWrapper = React.forwardRef(
  ({ isStateful }: { isStateful?: boolean }, ref) => {
    const config = isStateful === undefined ? undefined : { isStateful };
    safeRef = useForwardedRef(ref, config);
    safeRef.current = "safeRef:current";
    return null;
  },
);

describe("useForwardedRef", () => {
  let container: Node;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    safeRef = undefined;

    document.body.removeChild(container);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    container = null;
  });

  test("useForwardedRef is not null", () => {
    expect(useForwardedRef).toBeTruthy();
  });

  test("useStatefulRef is called", () => {
    act(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ReactDOM.createRoot(container).render(<HookWrapper />);
    });

    expect(useStatefulRef).toBeCalled();
    expect(safeRef).toMatchSnapshot();
  });

  it("should call ref callback", () => {
    const ref = vi.fn();
    act(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ReactDOM.createRoot(container).render(<HookWrapper ref={ref} />);
    });
    expect(ref).toBeCalled();
  });

  it("should update a ref object", () => {
    const ref = { current: undefined };
    act(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ReactDOM.createRoot(container).render(<HookWrapper ref={ref} />);
    });
    expect(ref).toMatchSnapshot();
  });
});

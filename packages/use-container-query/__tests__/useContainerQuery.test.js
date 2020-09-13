import React from "react";
import ReactDOM from "react-dom/";
import { act } from "react-dom/test-utils";
import ResizeObserver from "resize-observer-polyfill";

import useContainerQuery from "../src";

jest.mock("resize-observer-polyfill", () =>
  jest.fn((impl) => ({
    observe: jest.fn(() => impl([{ contentRect: { width: 300 } }])),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }))
);

let matches;
const HookWrapper = ({ minWidth, maxWidth, withNode = true }) => {
  const node = withNode ? document.createElement("div") : null;

  matches = useContainerQuery(node, minWidth, maxWidth);

  return null;
};

describe("useContainerQuery", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    matches = undefined;
    document.body.removeChild(container);
    container = null;
  });

  test("useContainerQuery is not null", () => {
    expect(useContainerQuery).toBeTruthy();
  });

  test("ResizeObserver is called", () => {
    act(() => {
      ReactDOM.render(<HookWrapper minWidth={320} />, container);
    });

    expect(ResizeObserver).toBeCalled();
    expect(matches).toBe(true);
  });

  it("should match when inbetween minWidth and maxWidth", () => {
    act(() => {
      ReactDOM.render(<HookWrapper minWidth={100} maxWidth={400} />, container);
    });

    expect(ResizeObserver).toBeCalled();
    expect(matches).toBe(true);
  });

  it("should not match when below minWidth and maxWidth", () => {
    act(() => {
      ReactDOM.render(<HookWrapper minWidth={100} maxWidth={200} />, container);
    });

    expect(ResizeObserver).toBeCalled();
    expect(matches).toBe(false);
  });

  it("should not match when above minWidth and maxWidth", () => {
    act(() => {
      ReactDOM.render(<HookWrapper minWidth={330} maxWidth={400} />, container);
    });

    expect(ResizeObserver).toBeCalled();
    expect(matches).toBe(false);
  });

  it("should prefer borderBox over contentRect", () => {
    ResizeObserver.mockImplementation(
      jest.fn((impl) => ({
        observe: jest.fn(() =>
          impl([{ contentRect: { width: 2 }, borderBox: { inlineSize: 1 } }])
        ),
        disconnect: jest.fn(),
        unobserve: jest.fn(),
      }))
    );

    act(() => {
      ReactDOM.render(<HookWrapper />, container);
    });

    expect(ResizeObserver).toBeCalled();
    expect(matches).toBe(true);
  });

  test("Will match on 1px if no minWidth provided", () => {
    ResizeObserver.mockImplementation(
      jest.fn((impl) => ({
        observe: jest.fn(() => impl([{ contentRect: { width: 1 } }])),
        disconnect: jest.fn(),
        unobserve: jest.fn(),
      }))
    );

    act(() => {
      ReactDOM.render(<HookWrapper />, container);
    });

    expect(ResizeObserver).toBeCalled();
    expect(matches).toBe(true);
  });

  test("Will return false if no node provided", () => {
    ResizeObserver.mockImplementation(
      jest.fn((impl) => ({
        observe: jest.fn(() => impl([{ contentRect: { width: 1 } }])),
        disconnect: jest.fn(),
        unobserve: jest.fn(),
      }))
    );

    act(() => {
      ReactDOM.render(<HookWrapper withNode={false} />, container);
    });

    expect(ResizeObserver).toBeCalled();
    expect(matches).toBe(false);
  });

  test("Throws and error when called with a maxWidth less than minWidth", () => {
    const renderToThrow = () =>
      act(() => {
        ReactDOM.render(
          <HookWrapper minWidth={320} maxWidth={100} />,
          container
        );
      });

    expect(renderToThrow).toThrow();
  });
});

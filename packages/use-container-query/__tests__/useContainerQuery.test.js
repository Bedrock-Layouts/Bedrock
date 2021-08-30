import React from "react";
import ReactDOM from "react-dom/";
import { act } from "react-dom/test-utils";

import useContainerQuery from "../src";

jest.spyOn(console, "error").mockImplementation(() => void 0);

let createNode = jest.fn((node) => ({
  target: node,
  contentRect: { width: 300 },
}));

let onChange;
let reset = () => void 0;
ResizeObserver.mockImplementation(
  jest.fn((impl) => {
    const map = new Map();

    onChange = () => {
      impl([...map.values()]);
    };

    reset = () => map.clear();

    return {
      observe: jest.fn((node) => {
        map.set(node, createNode(node));
        onChange();
      }),
      disconnect: jest.fn(map.clear),
      unobserve: jest.fn((node) => map.delete(node)),
    };
  })
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
    reset();
    matches = undefined;
    container = null;
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test("useContainerQuery is not null", () => {
    expect(useContainerQuery).toBeTruthy();
  });

  test("ResizeObserver is called", async () => {
    await act(async () => {
      ReactDOM.render(<HookWrapper minWidth={320} />, container);
    });

    expect(matches).toBe(true);
  });

  it("should match when inbetween minWidth and maxWidth", async () => {
    await act(async () => {
      ReactDOM.render(<HookWrapper minWidth={100} maxWidth={400} />, container);
    });

    expect(matches).toBe(true);
  });

  it("should not match when below minWidth and maxWidth", async () => {
    await act(async () => {
      ReactDOM.render(<HookWrapper minWidth={100} maxWidth={200} />, container);
    });
    expect(matches).toBe(false);

    expect(matches).toBe(false);
  });

  it("should not match when above minWidth and maxWidth", async () => {
    await act(async () => {
      ReactDOM.render(<HookWrapper minWidth={330} maxWidth={400} />, container);
    });

    expect(matches).toBe(false);
  });

  it("should prefer borderBox over contentRect", async () => {
    createNode.mockImplementation((node) => ({
      target: node,
      contentRect: { width: 2 },
      borderBox: { inlineSize: 1 },
    }));

    await act(async () => {
      ReactDOM.render(<HookWrapper minWidth={2} />, container);
    });

    expect(matches).toBe(true);
  });

  test("Will match on 1px if no minWidth provided", async () => {
    createNode.mockImplementation((node) => ({
      target: node,
      contentRect: { width: 1 },
    }));

    await act(async () => {
      ReactDOM.render(<HookWrapper />, container);
    });

    expect(matches).toBe(true);
  });

  test("Will return false if no node provided", async () => {
    createNode.mockImplementation((node) => ({
      target: node,
      contentRect: { width: 1 },
    }));

    await act(async () => {
      ReactDOM.render(<HookWrapper withNode={false} />, container);
    });

    expect(matches).toBe(false);
  });

  test("Will return false if node has a width of 0px", async () => {
    createNode.mockImplementation((node) => ({
      target: node,
      contentRect: { width: 0 },
    }));

    await act(async () => {
      ReactDOM.render(<HookWrapper />, container);
    });

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

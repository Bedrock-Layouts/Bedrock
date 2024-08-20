import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";

import { useContainerQuery } from "../src";

vi.spyOn(console, "error").mockImplementation(() => void 0);

const NODE_WIDTH = 300;

let createNode = vi.fn((node) => ({
  target: node,
  contentRect: { width: NODE_WIDTH },
}));

async function awaitAnimationFrame() {
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

let onChange;
let unobserve;
let reset = () => void 0;
ResizeObserver.mockImplementation(
  vi.fn((impl) => {
    const map = new Map();

    onChange = () => {
      impl([...map.values()]);
    };

    reset = () => map.clear();
    unobserve = vi.fn((node) => map.delete(node));

    return {
      observe: vi.fn((node) => {
        const result = createNode(node);
        map.set(node, result);
        impl([result]);
      }),
      disconnect: vi.fn(map.clear),
      unobserve,
    };
  }),
);

let matches;
const HookWrapper = forwardRef(
  ({ minWidth, maxWidth, withNode = true }, ref) => {
    const [doesMatch, nodeRef] = useContainerQuery(
      { width: minWidth, maxWidth },
      ref,
    );

    matches = doesMatch;

    nodeRef.current = withNode
      ? (nodeRef.current ?? document.createElement("div"))
      : null;

    return null;
  },
);

describe("useContainerQuery", () => {
  let container;

  beforeEach(async () => {
    await awaitAnimationFrame();
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
      await awaitAnimationFrame();
    });

    expect(matches).toBe(true);
  });

  it("should match when inbetween minWidth and maxWidth", async () => {
    await act(async () => {
      ReactDOM.render(<HookWrapper minWidth={100} maxWidth={400} />, container);
      await awaitAnimationFrame();
    });

    expect(matches).toBe(true);
  });

  it("should not match when below minWidth and maxWidth", async () => {
    await act(async () => {
      ReactDOM.render(<HookWrapper minWidth={100} maxWidth={200} />, container);
      await awaitAnimationFrame();
    });
    expect(matches).toBe(false);

    expect(matches).toBe(false);
  });

  it("should not match when above minWidth and maxWidth", async () => {
    await act(async () => {
      ReactDOM.render(<HookWrapper minWidth={330} maxWidth={400} />, container);
      await awaitAnimationFrame();
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
      await awaitAnimationFrame();
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
      await awaitAnimationFrame();
    });

    expect(matches).toBe(true);
  });

  it("Will return false if no node provided", async () => {
    createNode.mockImplementation((node) => ({
      target: node,
      contentRect: { width: 1 },
    }));

    await act(async () => {
      ReactDOM.render(<HookWrapper withNode={false} />, container);
      await awaitAnimationFrame();
    });

    expect(matches).toBe(false);
  });

  it("Will return false if node has a width of 0px", async () => {
    createNode.mockImplementation((node) => ({
      target: node,
      contentRect: { width: 0 },
    }));

    await act(async () => {
      ReactDOM.render(<HookWrapper />, container);
      await awaitAnimationFrame();
    });

    expect(matches).toBe(false);
  });
});

import React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";

import * as imports from "../src";

const { useResizeObserver } = imports;

vi.spyOn(console, "error").mockImplementation(() => void 0);

async function awaitAnimationFrame() {
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

let createNode = vi.fn((node) => ({
  target: node,
  contentRect: { width: 300 },
}));

let onChange;
let reset = () => void 0;
ResizeObserver.mockImplementation(
  vi.fn((impl) => {
    const map = new Map();

    onChange = () => {
      impl([...map.values()]);
    };

    reset = () => map.clear();

    return {
      observe: vi.fn((node) => {
        map.set(node, createNode(node));
        onChange();
      }),
      disconnect: vi.fn(map.clear),
      unobserve: vi.fn((node) => map.delete(node)),
    };
  })
);

let callback = vi.fn();
const node = document.createElement("div");

const HookWrapper = () => {
  const ref = useResizeObserver(callback);
  ref.current = node;
  return null;
};

describe("useResizeObserver", () => {
  let container;

  beforeEach(async () => {
    await awaitAnimationFrame();
    reset();
    vi.clearAllMocks();
    container = null;
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
  });

  test("useResizeObserver is not null", () => {
    expect(useResizeObserver).toBeTruthy();
  });

  test("ResizeObserver is called", async () => {
    await act(async () => {
      ReactDOM.render(<HookWrapper />, container);
      await awaitAnimationFrame();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("ResizeObserver remove callback", async () => {
    await act(async () => {
      ReactDOM.render(<HookWrapper />, container);
      await awaitAnimationFrame();
    });

    expect(callback).toHaveBeenCalledTimes(1);

    await act(async () => {
      unmountComponentAtNode(container);
    });

    onChange();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

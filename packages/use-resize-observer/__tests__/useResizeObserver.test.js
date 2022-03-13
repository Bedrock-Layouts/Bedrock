import React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import useResizeObserver from "../src";

jest.spyOn(console, "error").mockImplementation(() => void 0);

async function awaitAnimationFrame() {
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

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

let callback = jest.fn();
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
    jest.clearAllMocks();
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

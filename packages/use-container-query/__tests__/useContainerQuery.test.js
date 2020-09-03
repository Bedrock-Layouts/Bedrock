import React from "react";
import ReactDOM from "react-dom/";
import { act } from "react-dom/test-utils";
import ResizeObserver from "resize-observer-polyfill";

import useContainerQuery from "../src";

//import { create } from "react-test-renderer";

jest.mock("resize-observer-polyfill", () =>
  jest.fn((impl) => ({
    observe: jest.fn(() => impl([{ contentRect: { width: 300 } }])),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }))
);

let matches;
const HookWrapper = () => {
  matches = useContainerQuery(document.createElement("div"), 320);
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
      ReactDOM.render(<HookWrapper />, container);
    });

    expect(ResizeObserver).toBeCalled();
    expect(matches).toBe(true);
  });
});

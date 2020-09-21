import React from "react";
import ReactDOM from "react-dom/";
import { act } from "react-dom/test-utils";

import useMediaQuery from "../src";

let matches;
const HookWrapper = ({ width = 320 }) => {
  matches = useMediaQuery(`(max-width:${width}px)`);

  return null;
};

describe("useMediaQuery", () => {
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
  test("useMediaQuery is not null", () => {
    expect(useMediaQuery).toBeTruthy();
  });
  it("should call window.matchMedia", () => {
    act(() => {
      ReactDOM.render(<HookWrapper />, container);
    });

    expect(window.matchMedia).toBeCalled();
    expect(window.matchMedia.mock.calls).toMatchSnapshot();
  });

  it("should update matches when listener is called", () => {
    let listeners = [];
    window.matchMedia.mockImplementation((query) => ({
      matches: true,
      media: query,
      addListener: jest.fn((fn) => {
        listeners = listeners.concat(fn);
      }),
      removeListener: jest.fn((fn) => {
        listeners = listeners.filter((listener) => listener !== fn);
      }),
    }));

    act(() => {
      ReactDOM.render(<HookWrapper />, container);
    });

    listeners[0]({ matches: false });

    expect(matches).toBe(false);
    window.matchMedia.mockRestore();
  });

  it("wont update matches if unmounted", () => {
    let listeners = [];
    window.matchMedia.mockImplementation((query) => ({
      matches: true,
      media: query,
      addListener: jest.fn((fn) => {
        listeners = listeners.concat(fn);
      }),
      removeListener: jest.fn(),
    }));

    act(() => {
      ReactDOM.render(<HookWrapper />, container);
    });

    act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });

    listeners[0]({ matches: false });

    expect(matches).toBe(true);
    window.matchMedia.mockRestore();
  });

  it("returns false if matchMedia not on window", () => {
    const matchMedia = window.matchMedia;
    window.matchMedia = undefined;
    act(() => {
      ReactDOM.render(<HookWrapper />, container);
    });

    expect(matches).toBe(false);
    window.matchMedia = matchMedia;
  });
});

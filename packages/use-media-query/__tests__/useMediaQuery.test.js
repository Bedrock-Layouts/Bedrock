import React from "react";
import ReactDOM from "react-dom/";
import { act } from "react-dom/test-utils";

import useMediaQuery from "../src";

let matches = true;
const HookWrapper = ({ width = 320 }) => {
  matches = useMediaQuery(`(max-width:${width}px)`);

  return null;
};

jest.spyOn(console, "error").mockImplementation(() => void 0);

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

  it("should call window.matchMedia", async () => {
    await act(async () => {
      ReactDOM.render(<HookWrapper />, container);
    });

    expect(window.matchMedia).toBeCalled();
    expect(window.matchMedia.mock.calls).toMatchSnapshot();
  });

  it("should update matches when listener is called", async () => {
    let listeners = [];
    window.matchMedia.mockImplementation((query) => ({
      matches: true,
      media: query,
      addEventListener: jest.fn((_, fn) => {
        listeners = listeners.concat(fn);
      }),
      removeEventListener: jest.fn((_, fn) => {
        listeners = listeners.filter((listener) => listener !== fn);
      }),
    }));

    await act(async () => {
      ReactDOM.render(<HookWrapper />, container);
    });

    listeners[0]({ matches: false });

    expect(matches).toBe(false);
    window.matchMedia.mockRestore();
  });

  it("wont update matches if unmounted", async () => {
    let listeners = [];

    window.matchMedia.mockImplementation((query) => ({
      matches: true,
      media: query,
      addEventListener: jest.fn((_, fn) => {
        listeners.push(fn);
      }),
      removeEventListener: jest.fn((_, fn) => {
        listeners = listeners.filter((listener) => listener !== fn);
      }),
    }));

    await act(async () => {
      ReactDOM.render(<HookWrapper />, container);
    });

    const fn = listeners[0];

    await act(async () => {
      if (ReactDOM.unmountComponentAtNode(container)) {
        fn({ matches: false });
      }
    });

    expect(matches).toBe(true);
    window.matchMedia.mockRestore();
  });

  it("returns false if matchMedia not on window", async () => {
    const fakeRef = {
      current: null,
    };

    jest.spyOn(React, "useRef").mockImplementation(() => fakeRef);

    const matchMedia = window.matchMedia;

    window.matchMedia = undefined;

    await act(async () => {
      ReactDOM.render(<HookWrapper />, container);
    });

    expect(matches).toBe(false);
    expect(fakeRef.current).toBe(null);

    window.matchMedia = matchMedia;
  });
});

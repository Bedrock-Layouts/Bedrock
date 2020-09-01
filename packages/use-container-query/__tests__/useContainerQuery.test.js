// import React from "react";
// import ReactDOM from "react-dom/";
// import { act } from "react-dom/test-utils";

import useContainerQuery from "../src";

//import { create } from "react-test-renderer";

const OBSERVE = jest.fn();
const UNOBSERVE = jest.fn();
// class ResizeObserverMock {
//   constructor() {
//     this.observe = OBSERVE;
//     this.unobserve = UNOBSERVE;
//   }
// }

window.ResizeObserver = jest.fn(() => ({
  observe: OBSERVE,
  unobserve: UNOBSERVE,
}));

// const HookWrapper = () => {
//   useContainerQuery({}, 320);
//   return null;
// };

describe("useContainerQuery", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  test("useContainerQuery is not null", () => {
    expect(useContainerQuery).toBeTruthy();
  });

  // test("ResizeObserver is called", () => {
  //   act(() => {
  //     ReactDOM.render(<HookWrapper />, container);
  //   });

  //   expect(OBSERVE).toBeCalled();
  // });
});

import React from "react";
import ReactDOM from "react-dom/";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";

import * as imports from "../src";

const { useStatefulRef } = imports;

vi.spyOn(React, "useState");

let state = undefined;

const setState = vi.fn((newState) => {
  state = newState;
});

React.useState.mockImplementation((initialValue) => {
  state = initialValue;
  return [state, setState];
});

let statefulRef;
const HookWrapper = ({ value, initialValue }) => {
  statefulRef = useStatefulRef(initialValue);
  if (value) {
    statefulRef.current = value;
  }
  return null;
};

describe("useStatefulRef", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    state = undefined;
    statefulRef = undefined;
    document.body.removeChild(container);
    container = null;
    setState.mockRestore();
  });

  test("useStatefulRef is not null", () => {
    expect(useStatefulRef).toBeTruthy();
  });

  it("should call useState", () => {
    act(() => {
      ReactDOM.render(<HookWrapper />, container);
    });

    expect(React.useState).toBeCalled();
  });

  it("should call setState when setting value", () => {
    act(() => {
      ReactDOM.render(
        <HookWrapper initialValue="Testing" value="Test" />,
        container
      );
    });

    expect(setState).toBeCalled();
    expect(statefulRef).toMatchSnapshot();
  });

  it("should call not call setState when setting value to same value", () => {
    expect(setState).not.toBeCalled();

    act(() => {
      ReactDOM.render(
        <HookWrapper initialValue="Test" value="Test" />,
        container
      );
    });

    expect(setState).not.toBeCalled();

    expect(setState.mock.calls).toMatchSnapshot();
  });
});

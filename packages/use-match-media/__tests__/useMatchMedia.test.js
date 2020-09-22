import useMediaQuery from "@bedrock-layout/use-media-query";
import React from "react";
import ReactDOM from "react-dom/";
import { act } from "react-dom/test-utils";

import useMatchMedia from "../src";

jest.mock("@bedrock-layout/use-media-query");

useMediaQuery.mockImplementation(() => true);

let matches;
const HookWrapper = () => {
  matches = useMatchMedia();

  return null;
};

describe("useMatchMedia", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  test("useMatchMedia is not null", () => {
    expect(useMatchMedia).toBeTruthy();
  });

  it("should call useMediaQuery", () => {
    act(() => {
      ReactDOM.render(<HookWrapper />, container);
    });

    expect(useMediaQuery).toBeCalled();

    expect(matches).toMatchSnapshot();
    expect(useMediaQuery.mock.calls).toMatchSnapshot();
  });
});

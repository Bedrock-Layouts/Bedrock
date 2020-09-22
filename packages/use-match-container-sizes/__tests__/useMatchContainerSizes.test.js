import useContainerQuery from "@bedrock-layout/use-container-query";
import React from "react";
import ReactDOM from "react-dom/";
import { act } from "react-dom/test-utils";

import useMatchContainerSizes from "../src";

jest.mock("@bedrock-layout/use-container-query");

useContainerQuery.mockImplementation(() => true);

let matches;
const HookWrapper = () => {
  const node = document.createElement("div");
  matches = useMatchContainerSizes(node);

  return null;
};

describe("useMatchContainerSizes", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  test("useMatchContainerSizes is not null", () => {
    expect(useMatchContainerSizes).toBeTruthy();
  });

  it("should call useContainerQuery", () => {
    act(() => {
      ReactDOM.render(<HookWrapper />, container);
    });

    expect(useContainerQuery).toBeCalled();

    expect(matches).toMatchSnapshot();
    expect(useContainerQuery.mock.calls).toMatchSnapshot();
  });
});

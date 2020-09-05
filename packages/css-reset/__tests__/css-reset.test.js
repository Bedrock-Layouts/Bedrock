import React from "react";
import { create } from "react-test-renderer";

import { GlobalStyles } from "../src";

describe("CSS-Reset", () => {
  it("should render css-reset global-style", () => {
    const globalStyles = create(
      <>
        <GlobalStyles />
      </>
    );
    expect(globalStyles.toJSON()).toMatchSnapshot();
  });
});

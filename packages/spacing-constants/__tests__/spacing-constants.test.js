import * as constants from "../src";

describe("Spacing Constants", () => {
  test("constant snapshot", () => {
    expect(constants).toMatchSnapshot();
  });

  it("merges spacing", () => {
    const newSpacings = { xl: "8rem" };
    expect(constants.mergeSpacings(newSpacings)).toMatchSnapshot();
  });

  it("does not break if called without an object", () => {
    expect(constants.mergeSpacings()).toMatchSnapshot();
  });

  it("merges breakpoints", () => {
    const newBreakpoints = { xlarge: "1300px" };
    expect(constants.mergeBreakpoints(newBreakpoints)).toMatchSnapshot();
  });

  it("does not break if called with no object", () => {
    expect(constants.mergeBreakpoints()).toMatchSnapshot();
  });
});

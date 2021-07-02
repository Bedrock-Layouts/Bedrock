import * as constants from "../src";

describe("Spacing Constants", () => {
  test("constant snapshot", () => {
    expect(constants).toMatchSnapshot();
  });

  it("merges breakpoints", () => {
    const newBreakpoints = { xlarge: "1300px" };
    expect(constants.mergeBreakpoints(newBreakpoints)).toMatchSnapshot();
  });

  it("does not break if called with no object", () => {
    expect(constants.mergeBreakpoints()).toMatchSnapshot();
  });

  it("should return a string if no spacing provided", () => {
    expect(constants.getSpacingValue({}, "lg")).toBe("1rem");
  });

  it("should return undefined if no spacing provided and incorrect key", () => {
    expect(constants.getSpacingValue({}, "noKey")).toBe(undefined);
  });

  it("should return a string if spacing provided", () => {
    expect(constants.getSpacingValue({ spacing: { "1x": "1rem" } }, "1x")).toBe(
      "1rem"
    );
  });

  it("should return a string if spacing provided using number", () => {
    expect(constants.getSpacingValue({ spacing: { "1x": 1 } }, "1x")).toBe(
      "1px"
    );
  });

  it("should return a undefined if spacing provided with incorrect key", () => {
    expect(constants.getSpacingValue({ spacing: { "1x": "1rem" } }, "lg")).toBe(
      undefined
    );
  });
});

describe("Size Constants", () => {
  it("should return a string if no sizes provided", () => {
    expect(constants.getSizeValue({}, "large")).toBe("1199px");
  });

  it("should return undefined if no sizes provided and incorrect key", () => {
    expect(constants.getSizeValue({}, "noKey")).toBe(undefined);
  });

  it("should return a string if sizes provided", () => {
    expect(constants.getSizeValue({ sizes: { "1x": "1199px" } }, "1x")).toBe(
      "1199px"
    );
  });

  it("should return a string if sizes provided using number", () => {
    expect(constants.getSizeValue({ sizes: { "1x": 1 } }, "1x")).toBe("1px");
  });

  it("should return a undefined if sizes provided with incorrect key", () => {
    expect(constants.getSizeValue({ sizes: { "1x": "1199px" } }, "lg")).toBe(
      undefined
    );
  });
});

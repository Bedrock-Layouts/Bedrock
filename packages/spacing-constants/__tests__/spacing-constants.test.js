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

  it("should return undefined if sizekey is a number", () => {
    expect(constants.getSizeValue({ sizes: { "1x": 1 } }, 1)).toBe(undefined);
  });

  it("should return a undefined if sizes provided with incorrect key", () => {
    expect(constants.getSizeValue({ sizes: { "1x": "1199px" } }, "lg")).toBe(
      undefined
    );
  });
});

describe("checkIsCSSLength", () => {
  it.each`
    value                | expected
    ${"garbage"}         | ${false}
    ${{ value: "1rem" }} | ${false}
    ${"px"}              | ${false}
    ${1}                 | ${false}
    ${"1"}               | ${false}
    ${"em1"}             | ${false}
    ${"1me"}             | ${false}
    ${" "}               | ${false}
    ${"1em"}             | ${true}
    ${"0.25em"}          | ${true}
    ${"11em"}            | ${true}
    ${"110000000em"}     | ${true}
    ${"1vmin"}           | ${true}
    ${"1vmax"}           | ${true}
    ${"1vh"}             | ${true}
    ${"1vw"}             | ${true}
    ${"1%"}              | ${true}
    ${"1ch"}             | ${true}
    ${"1ex"}             | ${true}
    ${"1em"}             | ${true}
    ${"1rem"}            | ${true}
    ${"1in"}             | ${true}
    ${"1cm"}             | ${true}
    ${"1mm"}             | ${true}
    ${"1pt"}             | ${true}
    ${"1pc"}             | ${true}
    ${"1px"}             | ${true}
  `("should return correct response", ({ value, expected }) => {
    expect(constants.checkIsCSSLength(value)).toBe(expected);
  });
});

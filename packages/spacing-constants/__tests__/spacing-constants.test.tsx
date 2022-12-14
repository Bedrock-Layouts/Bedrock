import { describe, expect, it, test } from "vitest";

import * as constants from "../src";

describe("Spacing Constants", () => {
  test("constant snapshot", () => {
    expect(constants).toMatchSnapshot();
  });

  it("should return a string if no spacing provided", () => {
    expect(constants.getSpacingValue({}, "size3")).toBe("1rem");
  });

  it("should return undefined if no spacing provided and incorrect key", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(constants.getSpacingValue({}, "noKey")).toBe(undefined);
  });

  it("should return a string if spacing provided", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(constants.getSpacingValue({ space: { "1x": "1rem" } }, "1x")).toBe(
      "1rem"
    );
  });

  it("should return a string if spacing provided using number", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(constants.getSpacingValue({ space: { "1x": 1 } }, "1x")).toBe("1px");
  });

  it("should return a undefined if spacing provided with incorrect key", () => {
    expect(
      constants.getSpacingValue({ space: { "1x": "1rem" } }, "size3")
    ).toBe(undefined);
  });
});

describe("gutter helpers", () => {
  describe("getSafeGutter", () => {
    const theme = { space: constants.spacing };

    it.each([
      [undefined, undefined],
      [0, "0px"],
      ["garbage", undefined],
      [{ value: "1rem" }, undefined],
      ["px", undefined],
      ["1", undefined],
      ["em1", undefined],
      ["1me", undefined],
      [" ", undefined],
      ["var(--)", undefined],
      ["var(--1)", undefined],
      [1, "1px"],
      [100, "100px"],
      ["1em", "1em"],
      ["0.25em", "0.25em"],
      ["11em", "11em"],
      ["110000000em", "110000000em"],
      ["1vmin", "1vmin"],
      ["1vmax", "1vmax"],
      ["1vh", "1vh"],
      ["1vw", "1vw"],
      ["1%", "1%"],
      ["1ch", "1ch"],
      ["1ex", "1ex"],
      ["1em", "1em"],
      ["1rem", "1rem"],
      ["1in", "1in"],
      ["1cm", "1cm"],
      ["1mm", "1mm"],
      ["1pt", "1pt"],
      ["1pc", "1pc"],
      ["1px", "1px"],
      ["var(--yellow)", "var(--yellow)"],
      ["var(--x)", "var(--x)"],
      ["size3", constants.spacing["size3"]],
      ["--x", "var(--x)"],
    ])("returns correct value", (gutter, expected) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      expect(constants.getSafeGutter(theme, gutter)).toBe(expected);
    });
  });
});

describe("Size Constants", () => {
  it("should return a string if no sizes provided", () => {
    expect(constants.getSizeValue({}, "sizeLg")).toBe("1024px");
  });

  it("should return undefined if no sizes provided and incorrect key", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(constants.getSizeValue({}, "noKey")).toBe(undefined);
  });

  it("should return a string if sizes provided", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(constants.getSizeValue({ sizes: { "1x": "1199px" } }, "1x")).toBe(
      "1199px"
    );
  });

  it("should return a string if sizes provided using number", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(constants.getSizeValue({ sizes: { "1x": 1 } }, "1x")).toBe("1px");
  });

  it("should convert number to px if sizekey is a number", () => {
    expect(constants.getSizeValue({ sizes: { "1x": 1 } }, 1)).toBe("1px");
  });

  it("should return a undefined if sizes provided with incorrect key", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(constants.getSizeValue({ sizes: { "1x": "1199px" } }, "size3")).toBe(
      undefined
    );
  });
});

describe("checkIsCSSLength", () => {
  it.each([
    ["garbage", false],
    [{ value: "1rem" }, false],
    ["px", false],
    [1, false],
    ["1", false],
    ["em1", false],
    ["1me", false],
    [" ", false],
    ["1em", true],
    ["0.25em", true],
    ["11em", true],
    ["110000000em", true],
    ["1vmin", true],
    ["1vmax", true],
    ["1vh", true],
    ["1vw", true],
    ["1%", true],
    ["1ch", true],
    ["1ex", true],
    ["1em", true],
    ["1rem", true],
    ["1in", true],
    ["1cm", true],
    ["1mm", true],
    ["1pt", true],
    ["1pc", true],
    ["1px", true],
    ["var(--yellow)", true],
    ["var(--x)", true],
    ["var(--)", false],
    ["var(--1)", false],
    ["--size-3", true],
    ["var(--size-3)", true],
    ["var(--size-3, 100px)", true],
  ])("checkIsCSSLength(%s) -> %s", (value, expected) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    expect(constants.checkIsCSSLength(value)).toBe(expected);
  });
});

import { describe, expect, it, test } from "vitest";

import * as constants from "../src";

describe("Spacing Constants", () => {
  test("constant snapshot", () => {
    expect(constants).toBeDefined();
    expect(Object.keys(constants).length).toBeGreaterThan(0);
  });

  it("should return a string if spacing provided", () => {
    expect(constants.getSpacingValue("size3")).toBe("1rem");
  });

  it("should return undefined if incorrect key", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(constants.getSpacingValue("noKey")).toBe(undefined);
  });
});

describe("gutter helpers", () => {
  describe("getSafeGutter", () => {
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
      expect(constants.getSafeGutter(gutter)).toBe(expected);
    });
  });
});

describe("Size Constants", () => {
  it("should return a string if size key exists", () => {
    expect(constants.getSizeValue("sizeLg")).toBe("1024px");
  });

  it("should return undefined if incorrect key", () => {
    expect(constants.getSizeValue("noKey")).toBe(undefined);
  });

  it("should convert number to px if sizekey is a number", () => {
    expect(constants.getSizeValue(1)).toBe("1px");
  });

  it("should return undefined if size key is undefined", () => {
    expect(constants.getSizeValue(undefined)).toBe(undefined);
  });

  it("should handle CSS lengths", () => {
    expect(constants.getSizeValue("50vh")).toBe("50vh");
    expect(constants.getSizeValue("100%")).toBe("100%");
    expect(constants.getSizeValue("10rem")).toBe("10rem");
  });

  it("should handle CSS custom properties", () => {
    expect(constants.getSizeValue("var(--size-xl)")).toBe("var(--size-xl)");
    expect(constants.getSizeValue("--my-size")).toBe("var(--my-size)");
  });
});

describe("createAttributeString", () => {
  it("should create attribute string with prefix and value", () => {
    expect(constants.createAttributeString("gap", "size3")).toBe("gap:size3");
    expect(constants.createAttributeString("padding", "1rem")).toBe(
      "padding:1rem",
    );
    expect(constants.createAttributeString("margin", 10)).toBe("margin:10");
  });

  it("should return undefined when value is undefined", () => {
    expect(constants.createAttributeString("gap", undefined)).toBe(undefined);
  });
});

describe("getPaddingAttributes", () => {
  it("should return empty array when padding is undefined", () => {
    expect(constants.getPaddingAttributes(undefined)).toEqual([]);
  });

  it("should handle simple string padding value", () => {
    expect(constants.getPaddingAttributes("size4")).toEqual(["padding:size4"]);
    expect(constants.getPaddingAttributes("1rem")).toEqual(["padding:1rem"]);
  });

  it("should handle numeric padding value", () => {
    expect(constants.getPaddingAttributes(10)).toEqual(["padding:10px"]);
    expect(constants.getPaddingAttributes(0)).toEqual(["padding:0px"]);
  });

  it("should handle object with all property", () => {
    expect(constants.getPaddingAttributes({ all: "size5" })).toEqual([
      "padding:size5",
    ]);
    expect(constants.getPaddingAttributes({ all: 5 })).toEqual(["padding:5px"]);
  });

  it("should handle object with inline property", () => {
    expect(constants.getPaddingAttributes({ inline: "size3" })).toEqual([
      "paddingInline:size3",
    ]);
    expect(constants.getPaddingAttributes({ inline: 3 })).toEqual([
      "paddingInline:3px",
    ]);
  });

  it("should handle object with inlineStart property", () => {
    expect(constants.getPaddingAttributes({ inlineStart: "size2" })).toEqual([
      "paddingInlineStart:size2",
    ]);
    expect(constants.getPaddingAttributes({ inlineStart: 2 })).toEqual([
      "paddingInlineStart:2px",
    ]);
  });

  it("should handle object with inlineEnd property", () => {
    expect(constants.getPaddingAttributes({ inlineEnd: "size1" })).toEqual([
      "paddingInlineEnd:size1",
    ]);
    expect(constants.getPaddingAttributes({ inlineEnd: 1 })).toEqual([
      "paddingInlineEnd:1px",
    ]);
  });

  it("should handle object with block property", () => {
    expect(constants.getPaddingAttributes({ block: "size4" })).toEqual([
      "paddingBlock:size4",
    ]);
    expect(constants.getPaddingAttributes({ block: 4 })).toEqual([
      "paddingBlock:4px",
    ]);
  });

  it("should handle object with blockStart property", () => {
    expect(constants.getPaddingAttributes({ blockStart: "size3" })).toEqual([
      "paddingBlockStart:size3",
    ]);
    expect(constants.getPaddingAttributes({ blockStart: 3 })).toEqual([
      "paddingBlockStart:3px",
    ]);
  });

  it("should handle object with blockEnd property", () => {
    expect(constants.getPaddingAttributes({ blockEnd: "size2" })).toEqual([
      "paddingBlockEnd:size2",
    ]);
    expect(constants.getPaddingAttributes({ blockEnd: 2 })).toEqual([
      "paddingBlockEnd:2px",
    ]);
  });

  it("should handle object with multiple properties", () => {
    const result = constants.getPaddingAttributes({
      inline: "size5",
      block: "size2",
      inlineStart: "size1",
    });
    expect(result).toContain("paddingInline:size5");
    expect(result).toContain("paddingBlock:size2");
    expect(result).toContain("paddingInlineStart:size1");
    expect(result.length).toBe(3);
  });

  it("should handle numeric values in object", () => {
    expect(constants.getPaddingAttributes({ inline: 16 })).toEqual([
      "paddingInline:16px",
    ]);
    expect(constants.getPaddingAttributes({ block: 8 })).toEqual([
      "paddingBlock:8px",
    ]);
  });

  it("should handle empty object", () => {
    expect(constants.getPaddingAttributes({})).toEqual([]);
  });

  it("should handle all sides with numeric values", () => {
    const result = constants.getPaddingAttributes({
      inline: 16,
      inlineStart: 8,
      inlineEnd: 12,
      block: 20,
      blockStart: 10,
      blockEnd: 15,
    });
    expect(result).toHaveLength(6);
    expect(result).toContain("paddingInline:16px");
    expect(result).toContain("paddingInlineStart:8px");
    expect(result).toContain("paddingInlineEnd:12px");
    expect(result).toContain("paddingBlock:20px");
    expect(result).toContain("paddingBlockStart:10px");
    expect(result).toContain("paddingBlockEnd:15px");
  });
});

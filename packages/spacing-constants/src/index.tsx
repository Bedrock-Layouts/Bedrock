import { DefaultTheme } from "styled-components";

type LowercaseCharacter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";
type AllCharacter = LowercaseCharacter | Uppercase<LowercaseCharacter>;
type NonEmptyString = `${AllCharacter}${string}`;

type CSSCustomProperties = `var(--${NonEmptyString})`;

type LengthUnit =
  | "vmin"
  | "vmax"
  | "vh"
  | "vw"
  | "%"
  | "ch"
  | "ex"
  | "em"
  | "rem"
  | "in"
  | "cm"
  | "mm"
  | "pt"
  | "pc"
  | "px";

export type CSSLength = `${number}${LengthUnit}` | CSSCustomProperties;

export function checkIsCSSLength(str: string): str is CSSLength {
  if (typeof str !== "string") return false;

  return [
    /^[0-9]{0,10000}\.?[0-9]{1,10000}(vmin|vmax|vh|vw|%|ch|ex|em|rem|in|cm|mm|pt|pc|px)$/,
    /^var\(--\D{1,100}\)$/,
  ].some((regex) => regex.test(str));
}

export interface Spacing {
  none: CSSLength;
  xxs: CSSLength;
  xs: CSSLength;
  sm: CSSLength;
  md: CSSLength;
  mdLg: CSSLength;
  lg: CSSLength;
  lgXl: CSSLength;
  xl: CSSLength;
  xlXXl: CSSLength;
  xxl: CSSLength;
}

export interface Sizes {
  xxsmall: CSSLength;
  xsmall: CSSLength;
  small: CSSLength;
  medium: CSSLength;
  large: CSSLength;
  xlarge: CSSLength;
  xxlarge: CSSLength;
}

export type BaseTheme = Record<string, CSSLength | string | number>;

type ThemeOrDefaultSpace<T> = T extends {
  space: BaseTheme;
}
  ? T["space"]
  : T extends { spacing: BaseTheme }
  ? T["spacing"]
  : Spacing;

type ThemeOrDefaultSizes<T> = T extends {
  sizes: BaseTheme;
}
  ? T["sizes"]
  : Sizes;

export type SpacingOptions = ThemeOrDefaultSpace<DefaultTheme>;
export type SizesOptions = ThemeOrDefaultSizes<DefaultTheme>;

const none = "0px";
const xxs = "0.0625rem";
const xs = "0.125rem";
const sm = "0.25rem";
const md = "0.5rem";
const mdLg = "0.75rem";
const lg = "1rem";
const lgXl = "1.5rem";
const xl = "2rem";
const xlXXl = "3rem";
const xxl = "4rem";

export const spacing: Record<string, CSSLength> = {
  none,
  xxs,
  xs,
  sm,
  md,
  mdLg,
  lg,
  lgXl,
  xl,
  xlXXl,
  xxl,
};

const xxsmall = 159;
const xsmall = 319;
const small = 639;
const medium = 1023;
const large = 1199;
const xlarge = 1439;
const xxlarge = 1920;

export const sizes: Sizes = {
  xxsmall: `${xxsmall}px`,
  xsmall: `${xsmall}px`,
  small: `${small}px`,
  medium: `${medium}px`,
  large: `${large}px`,
  xlarge: `${xlarge}px`,
  xxlarge: `${xxlarge}px`,
};

function fromEntries<T>(entries: [s: string, value: T][]): Record<string, T> {
  return entries.reduce((acc, [key, value]) => {
    return { ...acc, [key]: value };
  }, {});
}

type MaybeValue = CSSLength | undefined;

type GetSpacingValue = <T>(
  theme: T & {
    spacing?: BaseTheme;
    space?: BaseTheme;
  },
  spacingKey: keyof Spacing | keyof SpacingOptions
) => MaybeValue;

export const getSpacingValue: GetSpacingValue = (theme, spacingKey) => {
  const maybeSpaceingOrDefault = theme.space ?? theme.spacing ?? spacing;

  const safeSpacings = fromEntries(
    Object.entries(maybeSpaceingOrDefault).map(([spaceKey, value]) => [
      spaceKey,
      typeof value === "number" ? `${value}px` : value,
    ])
  );

  const spacingVal = safeSpacings[spacingKey];

  const isCSSLength = checkIsCSSLength(spacingVal);

  return isCSSLength ? spacingVal : undefined;
};

type GetSizeValue = <T>(
  theme: T & {
    sizes?: BaseTheme;
  },
  sizingKey: unknown
) => MaybeValue;

export const getSizeValue: GetSizeValue = (theme, sizeKey) => {
  if (typeof sizeKey === "number" || sizeKey === undefined) return undefined;

  const maybeSizesOrDefault = theme.sizes ?? sizes;

  const safeSizes = fromEntries<CSSLength>(
    Object.entries(maybeSizesOrDefault).map(([sizeKey, value]) => [
      sizeKey,
      typeof value === "number" ? `${value}px` : value,
    ])
  );

  return safeSizes[sizeKey as string];
};

type NumberTuple = [number, number];
/* Based on Foundations Break Points */
const smallOnly = 639;
const mediumOnly: NumberTuple = [640, 1023];
const largeOnly: NumberTuple = [1024, 1199];
const xlargeOnly: NumberTuple = [1200, 1439];

export interface BreakPoints {
  smallOnly: number;
  mediumOnly: NumberTuple;
  largeOnly: NumberTuple;
  xlargeOnly: NumberTuple;
  medium: number;
  large: number;
  xlarge: number;
  xxlarge: number;
}

export type BreakPointTypes = keyof BreakPoints;

export const breakPoints: BreakPoints = {
  smallOnly,
  mediumOnly,
  largeOnly,
  xlargeOnly,
  medium,
  large,
  xlarge,
  xxlarge,
};

type MergeBreakpoints = (breakPoints: Record<string, unknown>) => BreakPoints;
export const mergeBreakpoints: MergeBreakpoints = (newBreakPoints = {}) => ({
  ...breakPoints,
  ...newBreakPoints,
});

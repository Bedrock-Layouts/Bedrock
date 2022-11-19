import OpenProps from "open-props";
import React, { createContext, useContext } from "react";

type Maybe<T> = NonNullable<T> | undefined;

function convertToMaybe<T extends unknown>(value: T): Maybe<T> {
  return value ?? undefined;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type DefaultTheme = {};

export const ThemeContext = createContext<DefaultTheme>({});

export function useTheme(): DefaultTheme {
  return useContext(ThemeContext);
}

export function ThemeProvider({
  theme,
  children,
}: {
  theme: DefaultTheme;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

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

function fromEntries<K extends string | number, T>(
  entries: [s: K, value: T][]
): Record<K, T> {
  return entries.reduce((acc, [key, value]) => {
    return { ...acc, [key]: value };
  }, {} as Record<K, T>);
}

const {
  sizeXxs,
  sizeXs,
  sizeSm,
  sizeMd,
  sizeLg,
  sizeXl,
  sizeXxl,
  sizeContent1,
  sizeContent2,
  sizeContent3,
  sizeHeader1,
  sizeHeader2,
  sizeHeader3,
  size000,
  size00,
  size1,
  size2,
  size3,
  size4,
  size5,
  size6,
  size7,
  size8,
  size9,
  size10,
  size11,
  size12,
  size13,
  size14,
  size15,
} = OpenProps;

const space = {
  size000,
  size00,
  size1,
  size2,
  size3,
  size4,
  size5,
  size6,
  size7,
  size8,
  size9,
  size10,
  size11,
  size12,
  size13,
  size14,
  size15,
};

const size = {
  sizeXxs,
  sizeXs,
  sizeSm,
  sizeMd,
  sizeLg,
  sizeXl,
  sizeXxl,
  sizeContent1,
  sizeContent2,
  sizeContent3,
  sizeHeader1,
  sizeHeader2,
  sizeHeader3,
};

export const spacing = space;

export const sizes = size;

export function checkIsCSSLength(str: string): str is CSSLength {
  if (typeof str !== "string") return false;

  return [
    /^[0-9]{0,10000}\.?[0-9]{1,10000}(vmin|vmax|vh|vw|%|ch|ex|em|rem|in|cm|mm|pt|pc|px)$/,
    /^var\(--\D{1,100}\)$/,
  ].some((regex) => regex.test(str));
}

export type BaseTheme = Record<string, CSSLength | string | number>;

type ThemeOrDefaultSpace<T> = T extends {
  space: BaseTheme;
}
  ? T["space"]
  : keyof typeof spacing;

type ThemeOrDefaultSizes<T> = T extends {
  sizes: BaseTheme;
}
  ? T["sizes"]
  : keyof typeof sizes;

export type SpacingOptions = ThemeOrDefaultSpace<DefaultTheme>;
export type SizesOptions = ThemeOrDefaultSizes<DefaultTheme>;

export function getSpacingValue<T>(
  theme: T & {
    spacing?: BaseTheme;
    space?: BaseTheme;
  },
  spacingKey: SpacingOptions
): Maybe<CSSLength> {
  const maybeSpacingOrDefault = theme.space ?? spacing;

  const safeSpacings = fromEntries(
    Object.entries(maybeSpacingOrDefault).map(([spaceKey, value]) => [
      spaceKey as SpacingOptions,
      (typeof value === "number" ? `${value}px` : value) as CSSLength,
    ])
  );

  return convertToMaybe(safeSpacings[spacingKey]);
}

export type Gutter = CSSLength | number | SpacingOptions;

export function getSafeGutter<T extends BaseTheme>(
  theme: T,
  gutter?: Gutter
): Maybe<CSSLength> {
  if (typeof gutter === "number" && gutter > 0) return `${gutter}px`;

  const isCSSLength = checkIsCSSLength(gutter as string);
  if (isCSSLength) return gutter as CSSLength;

  return gutter !== undefined
    ? getSpacingValue(theme, gutter as SpacingOptions)
    : undefined;
}

export function getSizeValue<T>(
  theme: T & {
    sizes?: BaseTheme;
  },
  sizeKey: SizesOptions
): Maybe<CSSLength> {
  if (typeof sizeKey === "number" || sizeKey === undefined) return undefined;

  const maybeSizesOrDefault = theme.sizes ?? sizes;

  const safeSizes = fromEntries(
    Object.entries(maybeSizesOrDefault).map(([sizeKey, value]) => [
      sizeKey as SizesOptions,
      (typeof value === "number" ? `${value}px` : value) as CSSLength,
    ])
  );

  return convertToMaybe(safeSizes[sizeKey]);
}

import React, { createContext, useContext } from "react";

type Maybe<T> = NonNullable<T> | undefined;

function convertToMaybe<T>(value: T): Maybe<T> {
  return value ?? undefined;
}

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-empty-interface
export interface DefaultTheme {}

export const ThemeContext = createContext<DefaultTheme>({});

/* c8 ignore next */
export function useTheme(): DefaultTheme {
  return useContext(ThemeContext) ?? {};
}

/* c8 ignore next */
export function ThemeProvider({
  theme,
  children,
}: Readonly<{ theme: DefaultTheme; children: React.ReactNode }>): JSX.Element {
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

type CSSLengthUnit = `${number}${LengthUnit}`;

type CSSCustomProperty = `--${NonEmptyString}`;

type CSSCustomPropertyWithVar = `var(${CSSCustomProperty})`;

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

type CSSSizeKeyword =
  | "auto"
  | "inherit"
  | "none"
  | "min-content"
  | "max-content"
  | "fit-content";

export type CSSLength =
  | CSSLengthUnit
  | CSSCustomPropertyWithVar
  | CSSCustomProperty
  | CSSSizeKeyword;

const spaceMap = {
  size000: "-.5rem",
  size00: "-.25rem",
  size1: ".25rem",
  size2: ".5rem",
  size3: "1rem",
  size4: "1.25rem",
  size5: "1.5rem",
  size6: "1.75rem",
  size7: "2rem",
  size8: "3rem",
  size9: "4rem",
  size10: "5rem",
  size11: "7.5rem",
  size12: "10rem",
  size13: "15rem",
  size14: "20rem",
  size15: "30rem",
} as const;

const sizeMap = {
  sizeContent1: "20ch",
  sizeContent2: "45ch",
  sizeContent3: "60ch",
  sizeHeader1: "20ch",
  sizeHeader2: "25ch",
  sizeHeader3: "35ch",
  sizeXxs: "240px",
  sizeXs: "360px",
  sizeSm: "480px",
  sizeMd: "768px",
  sizeLg: "1024px",
  sizeXl: "1440px",
  sizeXxl: "1920px",
} as const;

//TODO export above instead of below in next version
export const spacing = spaceMap as Record<keyof typeof spaceMap, CSSLength>;

export const sizes = sizeMap as Record<keyof typeof sizeMap, CSSLength>;

const customPropertyRegex = /^--\D{1}.{0,100}$/;

type PropertyResult<TvalidProp, TinvalidProp> =
  | {
      result: "valid";
      property: TvalidProp;
    }
  | {
      result: "invalid";
      property: TinvalidProp;
    };

type PropertyCheckFunction<T, K> = (property: K) => PropertyResult<T, K>;

/** A Higher Order Function that takes a function that will validate if val K is of type T and return a validator function */
function checkPropertyBy<T, K>(
  fn: (val: K) => boolean,
): PropertyCheckFunction<T, K> {
  return (property) => {
    return fn(property)
      ? {
          result: "valid",
          property: property as unknown as T,
        }
      : {
          result: "invalid",
          property,
        };
  };
}

const checkIsCSSCustomProperty = checkPropertyBy<CSSCustomProperty, string>(
  (str) => customPropertyRegex.test(str),
);

const checkIsCSSLength = checkPropertyBy<CSSLength, unknown>((str) => {
  if (typeof str !== "string") return false;

  return (
    [
      /^[0-9]{0,10000}\.?[0-9]{1,10000}(vmin|vmax|vh|vw|%|ch|ex|em|rem|in|cm|mm|pt|pc|px)$/,
      /^var\(--\D{1}.{0,100}\)$/,
      customPropertyRegex,
    ].some((regex) => regex.test(str)) ||
    [
      "auto",
      "inherit",
      "none",
      "min-content",
      "max-content",
      "fit-content",
    ].includes(str)
  );
});

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

//TODO - shouldn't take the whole theme.  Should take the spaceMap from the theme and probably shouldn't be exported.
export function getSpacingValue<T extends DefaultTheme>(
  theme: Readonly<T & { space?: BaseTheme }>,
  spacingKey: SpacingOptions,
): Maybe<CSSLength> {
  const spaceMapFromThemeOrDefault = theme.space ?? spacing;

  const spaceMap = Object.fromEntries(
    Object.entries(spaceMapFromThemeOrDefault).map(([spaceKey, value]) => [
      spaceKey as SpacingOptions,
      (typeof value === "number" ? `${value}px` : value) as CSSLength,
    ]),
  );

  return convertToMaybe(spaceMap[spacingKey]);
}

export type Gutter = CSSLength | number | SpacingOptions;

//TODO - change to getSpaceFromTheme in next version
//TODO - shouldn't take the whole theme.  Should take the spaceMap from the theme.
export function getSafeGutter<T extends DefaultTheme>(
  theme: T,
  gutter?: Gutter,
): Maybe<CSSLength> {
  if (gutter === undefined) return undefined;
  if (typeof gutter === "number" && gutter >= 0) return `${gutter}px`;

  const { result: cssLengthResult, property: cssLengthProperty } =
    checkIsCSSLength(gutter);

  if (typeof gutter === "string" && cssLengthResult === "valid") {
    const { result: customPropertyResult, property: customProperty } =
      checkIsCSSCustomProperty(cssLengthProperty);

    return customPropertyResult === "valid"
      ? `var(${customProperty})`
      : cssLengthProperty;
  }

  return convertToMaybe(getSpacingValue(theme, gutter as SpacingOptions));
}

//TODO - shouldn't take the whole theme.  Should take the sizeMap from the theme.
export function getSizeValue(
  theme: Readonly<{ sizes?: BaseTheme }>,
  sizeKey?: string | number,
): Maybe<CSSLength> {
  if (sizeKey === undefined) return undefined;
  if (typeof sizeKey === "number" && sizeKey >= 0) return `${sizeKey}px`;

  const { result: cssLengthResult, property: sizeLengthProperty } =
    checkIsCSSLength(sizeKey);

  if (cssLengthResult === "valid") {
    const { result: customPropertyResult, property: customProperty } =
      checkIsCSSCustomProperty(sizeLengthProperty);

    return customPropertyResult === "valid"
      ? `var(${customProperty})`
      : sizeLengthProperty;
  }

  const sizeMapFromThemeOrDefault = theme.sizes ?? sizes;

  const sizeMap = Object.fromEntries(
    Object.entries(sizeMapFromThemeOrDefault).map(([sizeKey, value]) => [
      sizeKey as SizesOptions,
      (typeof value === "number" ? `${value}px` : value) as CSSLength,
    ]),
  );

  return convertToMaybe(sizeMap[sizeKey as SizesOptions]);
}

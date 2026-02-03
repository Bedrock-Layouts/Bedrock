type Maybe<T> = NonNullable<T> | undefined;

function convertToMaybe<T>(value: T): Maybe<T> {
  return value ?? undefined;
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

export const spacing = {
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

export const sizes = {
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

const customPropertyRegex = /^--\D.{0,100}$/;

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

export const checkIsCSSCustomProperty = checkPropertyBy<
  CSSCustomProperty,
  string
>((str) => customPropertyRegex.test(str));

export const checkIsCSSLength = checkPropertyBy<CSSLength, unknown>((str) => {
  if (typeof str !== "string") return false;

  return (
    [
      /^\d{0,10000}\.?\d{1,10000}(vmin|vmax|vh|vw|%|ch|ex|em|rem|in|cm|mm|pt|pc|px)$/,
      /^var\(--\D.{0,100}\)$/,
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

export type SpacingOptions = keyof typeof spacing;
export type SizesOptions = keyof typeof sizes;

export function createAttributeString(
  prefix: string,
  value: string | number | undefined,
): string | undefined {
  if (value === undefined) return undefined;
  return `${prefix}:${value}`;
}

export function getSpacingValue(spacingKey: SpacingOptions): Maybe<CSSLength> {
  return convertToMaybe(spacing[spacingKey]);
}

export type Gutter = CSSLength | number | SpacingOptions;

export function getSafeGutter(gutter?: Gutter): Maybe<CSSLength> {
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

  return convertToMaybe(getSpacingValue(gutter as SpacingOptions));
}

export function getSizeValue(sizeKey?: string | number): Maybe<CSSLength> {
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

  return convertToMaybe(sizes[sizeKey as SizesOptions]);
}

/**
 * Type for padding configuration. Can be a single value or an object with specific padding sides.
 */
export type PaddingConfig =
  | SpacingOptions
  | CSSLength
  | number
  | {
      all?: SpacingOptions | CSSLength | number;
      inline?: SpacingOptions | CSSLength | number;
      inlineStart?: SpacingOptions | CSSLength | number;
      inlineEnd?: SpacingOptions | CSSLength | number;
      block?: SpacingOptions | CSSLength | number;
      blockStart?: SpacingOptions | CSSLength | number;
      blockEnd?: SpacingOptions | CSSLength | number;
    };

/**
 * Helper function to convert PaddingConfig to data attribute strings
 */
export function getPaddingAttributes(
  padding?: Readonly<PaddingConfig>,
): readonly string[] {
  if (padding === undefined) return [];

  if (typeof padding === "string" || typeof padding === "number") {
    // Simple padding value
    const value = typeof padding === "number" ? `${padding}px` : padding;
    return [`padding:${value}`] as const;
  }

  if (typeof padding === "object") {
    // Object with specific padding sides
    // eslint-disable-next-line functional/prefer-immutable-types, functional/immutable-data
    const attrs: Array<string> = [];

    if (padding.all !== undefined) {
      const value =
        typeof padding.all === "number" ? `${padding.all}px` : padding.all;
      // eslint-disable-next-line functional/immutable-data
      attrs.push(`padding:${value}`);
    }
    if (padding.inline !== undefined) {
      const value =
        typeof padding.inline === "number"
          ? `${padding.inline}px`
          : padding.inline;
      // eslint-disable-next-line functional/immutable-data
      attrs.push(`paddingInline:${value}`);
    }
    if (padding.inlineStart !== undefined) {
      const value =
        typeof padding.inlineStart === "number"
          ? `${padding.inlineStart}px`
          : padding.inlineStart;
      // eslint-disable-next-line functional/immutable-data
      attrs.push(`paddingInlineStart:${value}`);
    }
    if (padding.inlineEnd !== undefined) {
      const value =
        typeof padding.inlineEnd === "number"
          ? `${padding.inlineEnd}px`
          : padding.inlineEnd;
      // eslint-disable-next-line functional/immutable-data
      attrs.push(`paddingInlineEnd:${value}`);
    }
    if (padding.block !== undefined) {
      const value =
        typeof padding.block === "number"
          ? `${padding.block}px`
          : padding.block;
      // eslint-disable-next-line functional/immutable-data
      attrs.push(`paddingBlock:${value}`);
    }
    if (padding.blockStart !== undefined) {
      const value =
        typeof padding.blockStart === "number"
          ? `${padding.blockStart}px`
          : padding.blockStart;
      // eslint-disable-next-line functional/immutable-data
      attrs.push(`paddingBlockStart:${value}`);
    }
    if (padding.blockEnd !== undefined) {
      const value =
        typeof padding.blockEnd === "number"
          ? `${padding.blockEnd}px`
          : padding.blockEnd;
      // eslint-disable-next-line functional/immutable-data
      attrs.push(`paddingBlockEnd:${value}`);
    }

    return attrs;
  }

  return [];
}

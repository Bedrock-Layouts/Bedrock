import { DefaultTheme } from "styled-components";

export interface Spacing {
  none: string;
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  mdLg: string;
  lg: string;
  lgXl: string;
  xl: string;
  xlXXl: string;
  xxl: string;
}

type ThemeOrDefault<T> = T extends { spacing: Record<string, string | number> }
  ? T["spacing"]
  : T extends { space: Record<string, string | number> }
  ? T["space"]
  : Spacing;

export type SpacingOptions = ThemeOrDefault<DefaultTheme>;

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

export const spacing: Record<string, string> = {
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

function fromEntries<T>(entries: [s: string, value: T][]): Record<string, T> {
  return entries.reduce((acc, [key, value]) => {
    return { ...acc, [key]: value };
  }, {});
}

type MaybeValue = string | undefined;

type GetSpacingValue = <T>(
  theme: T & {
    spacing?: Record<string, string | number>;
    space?: Record<string, string | number>;
  },
  spacingKey: keyof Spacing | keyof SpacingOptions
) => MaybeValue;

export const getSpacingValue: GetSpacingValue = (theme, spacingKey) => {
  const maybeSpaceing = theme.spacing ?? theme.space;

  if (!maybeSpaceing) return spacing[spacingKey];

  const safeSpacings = fromEntries(
    Object.entries(maybeSpaceing).map(([spaceKey, value]) => [
      spaceKey,
      typeof value === "number" ? `${value}px` : value,
    ])
  );

  return safeSpacings[spacingKey];
};

type NumberTuple = [number, number];
/* Based on Foundations Break Points */
const smallOnly = 639;
const mediumOnly: NumberTuple = [640, 1023];
const largeOnly: NumberTuple = [1024, 1199];
const xlargeOnly: NumberTuple = [1200, 1439];
const medium = 1023;
const large = 1199;
const xlarge = 1439;
const xxlarge = 1920;

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

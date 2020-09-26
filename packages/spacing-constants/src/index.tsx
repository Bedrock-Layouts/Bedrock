const none = "0px";
const xs = "0.125rem";
const sm = "0.25rem";
const md = "0.5rem";
const mdLg = "0.75rem";
const lg = "1rem";
const lgXl = "1.5rem";
const xl = "2rem";
const xlXXl = "3rem";
const xxl = "4rem";

export interface Spacing {
  none: string;
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

export type SpacingTypes = keyof Spacing;

export const spacing: Spacing = {
  none,
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

type MergeSpacings = (spacing: object) => Spacing;
export const mergeSpacings: MergeSpacings = (newSpacings) => ({
  ...spacing,
  ...newSpacings,
});

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

type MergeBreakpoints = (breakPoints: object) => BreakPoints;
export const mergeBreakpoints: MergeBreakpoints = (newBreakPoints = {}) => ({
  ...breakPoints,
  ...newBreakPoints,
});

const none = '0px';
const xs = '0.125rem';
const sm = '0.25rem';
const md = '0.5rem';
const lg = '1rem';
const xl = '2rem';
const xxl = '4rem';

export interface Spacing {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export type SpacingTypes = keyof Spacing;

export const spacing: Spacing = {
  none,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
};

type MergeSpacings = (spacing: object) => Spacing;
export const mergeSpacings: MergeSpacings = (newSpacings = {}) => ({
  ...spacing,
  ...newSpacings,
});

type StringTuple = [string, string];
/* Based on Foundations Break Points */
const smallOnly: string = '39.9375rem';
const mediumOnly: StringTuple = ['40rem', '63.9375rem'];
const largeOnly: StringTuple = ['64rem', '74.9375rem'];
const xlargeOnly: StringTuple = ['75rem', '89.9375rem'];
const medium: string = '40rem';
const large: string = '64rem';
const xlarge: string = '75rem';
const xxlarge: string = '90rem';

export interface BreakPoints {
  smallOnly: string;
  mediumOnly: StringTuple;
  largeOnly: StringTuple;
  xlargeOnly: StringTuple;
  medium: string;
  large: string;
  xlarge: string;
  xxlarge: string;
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

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

/* Based on Foundations Break Points */
const smallOnly = '39.9375rem';
const mediumOnly = ['40rem', '63.9375rem'];
const largeOnly = ['64rem', '74.9375rem'];
const xlargeOnly = ['75rem', '89.9375rem'];
const medium = '40rem';
const large = '64rem';
const xlarge = '75rem';
const xxlarge = '90rem';

export interface BreakPoints {
  smallOnly: string;
  mediumOnly: string;
  largeOnly: string;
  xlargeOnly: string;
  medium: string;
  large: string;
  xlarge: string;
  xxlarge: string;
}

export type BreakPointTypes = keyof BreakPoints;

export const breakPoints = {
  smallOnly,
  mediumOnly,
  largeOnly,
  xlargeOnly,
  medium,
  large,
  xlarge,
  xxlarge,
};

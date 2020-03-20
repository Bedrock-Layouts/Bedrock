const none = '0px';
const xs = '0.125rem';
const sm = '0.25rem';
const md = '0.5rem';
const lg = '1rem';
const xl = '2rem';
const xxl = '4rem';

export type SpacingTypes = 'none' | 'xs' | 'sm' | 'ms' | 'lg' | 'xl' | 'xxl';

export const spacing = {
  none,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
};

//Based on Foundations break points
const smallOnly = '39.9375rem';
const mediumOnly = ['40rem', '63.9375rem'];
const largeOnly = ['64rem', '74.9375rem'];
const xlargeOnly = ['75rem', '89.9375rem'];
const medium = '40rem';
const large = '64rem';
const xlarge = '75rem';
const xxlarge = '90rem';

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

import {
  CSSLength,
  Gutter,
  SizesOptions,
  getSafeGutter,
  getSizeValue,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

type FractionTypes =
  | "auto-start"
  | "auto-end"
  | "1/4"
  | "1/3"
  | "1/2"
  | "2/3"
  | "3/4";

type Fractions = {
  [key in FractionTypes]: string;
};

const fractions: Fractions = {
  "1/4": "fraction:1/4",
  "1/3": "fraction:1/3",
  "1/2": "fraction:1/2",
  "2/3": "fraction:2/3",
  "3/4": "fraction:3/4",
  "auto-start": `auto 1fr`,
  "auto-end": `1fr auto`,
};

type MinItemWidth = number | CSSLength | SizesOptions;

/**
 * Props for the Split component.
 */
export interface SplitProps {
  /**
   * Sets space between each element.
   */
  gutter?: Gutter;
  /**
   * Sets the fractional ratio of the split.
   */
  fraction?: FractionTypes;
  /**
   * Sets the width breakpoint at which the columns
   * will switch to a single column.
   */
  switchAt?: number | CSSLength | SizesOptions;
  /**
   * Sets the minimum inline-size of each of the children.
   */
  minItemWidth?: MinItemWidth;
}

/**
 * The `Split` component is designed to create a split layout
 * based on a fractional ratio. The `Split` component will enforce
 * a standard spacing scheme through the `gutter` prop and will
 * optionally switch to a stack layout when the provided threshold
 * is reached.
 */
export const Split = forwardRefWithAs<"div", SplitProps>(function Split(
  { as, fraction, gutter, minItemWidth, switchAt, style, ...props },
  ref,
) {
  const theme = useTheme();
  const attrString =
    fraction && fractions[fraction] ? `fraction:${fraction}` : "";

  const maybeGutter = getSafeGutter(theme, gutter);

  const safeMinItemWidth = getSizeValue(theme, minItemWidth) ?? minItemWidth;

  const safeSwitchAt = getSizeValue(theme, switchAt) ?? switchAt;
  const safeStyle = style ?? {};

  const Component = as ?? "div";

  return (
    <Component
      ref={ref}
      data-bedrock-split={attrString}
      style={
        {
          ...safeStyle,
          "--gutter": maybeGutter,
          "--minItemWidth": safeMinItemWidth,
          "--switchAt": safeSwitchAt,
        } as CSSProperties
      }
      {...props}
    />
  );
});

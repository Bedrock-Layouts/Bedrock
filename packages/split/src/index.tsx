import {
  CSSLength,
  Gutter,
  SizesOptions,
  getSafeGutter,
  getSizeValue,
  PaddingConfig,
  getPaddingAttributes,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

const fractionTypes = [
  "auto-start",
  "auto-end",
  "1/4",
  "1/3",
  "1/2",
  "2/3",
  "3/4",
];

type FractionType = (typeof fractionTypes)[number];

type MinItemWidth = number | CSSLength | SizesOptions;

/**
 * Props for the Split component.
 */
export type SplitProps = {
  /**
   * Sets space between each element.
   */
  gap?: Gutter;
  /**
   * Sets the fractional ratio of the split.
   */
  fraction?: FractionType;
  /**
   * Sets the width breakpoint at which the columns
   * will switch to a single column.
   */
  switchAt?: number | CSSLength | SizesOptions;
  /**
   * Sets the minimum inline-size of each of the children.
   */
  minItemWidth?: MinItemWidth;
  /**
   * Sets padding on the component using design system spacing scale.
   */
  padding?: PaddingConfig;
};

/**
 * The `Split` component is designed to create a split layout
 * based on a fractional ratio. The `Split` component will enforce
 * a standard spacing scheme through the `gutter` prop and will
 * optionally switch to a stack layout when the provided threshold
 * is reached.
 */
export const Split = forwardRefWithAs<"div", SplitProps>(function Split(
  {
    as: Component = "div",
    fraction,
    gap,
    minItemWidth,
    switchAt,
    padding,
    style = {},
    ...props
  },
  ref,
) {
  const fractionAttr =
    typeof fraction === "string" && fractionTypes.includes(fraction)
      ? `fraction:${fraction}`
      : "";

  const maybeGutter = getSafeGutter(gap);

  const maybeMinItemWidth = getSizeValue(minItemWidth) ?? minItemWidth;

  const maybeSwitchAt = getSizeValue(switchAt) ?? switchAt;

  const paddingAttrs = getPaddingAttributes(padding);

  const attrString = [fractionAttr, ...paddingAttrs].filter(Boolean).join(" ");

  return (
    <Component
      ref={ref}
      data-br-split={attrString}
      style={
        {
          "--gap": maybeGutter,
          "--min-item-width": maybeMinItemWidth,
          "--switch-at": maybeSwitchAt,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
});

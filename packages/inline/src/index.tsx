import {
  CSSLength,
  Gutter,
  SizesOptions,
  createAttributeString,
  getSafeGutter,
  getSizeValue,
  PaddingConfig,
  getPaddingAttributes,
  checkIsCSSLength,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

/**
 * Validates and returns a CSS length value, or undefined if invalid
 */
function validateCSSLengthOrNumber(value: unknown): CSSLength | undefined {
  const sizeValue = getSizeValue(value as string | number | undefined);
  if (sizeValue !== undefined) return sizeValue;

  if (typeof value === "string") {
    return checkIsCSSLength(value).result === "valid"
      ? (value as CSSLength)
      : undefined;
  }

  return undefined;
}

type MinItemWidth = number | CSSLength | SizesOptions;
type SwitchAt = number | CSSLength | SizesOptions;

/**
 * The `Stretch` type is used to specify which child should stretch to fill the excess space.
 */
export type Stretch = "all" | "start" | "end" | 0 | 1 | 2 | 3 | 4;

/**
 * Validates a stretch value and returns it if valid, undefined otherwise
 */
function validateStretch(value: unknown): Stretch | undefined {
  const validStretchValues: Stretch[] = ["all", "start", "end", 0, 1, 2, 3, 4];
  if (validStretchValues.includes(value as Stretch)) {
    return value as Stretch;
  }
  return undefined;
}

/**
 * Props for the Inline component.
 */
export type InlineProps = {
  /**
   * The `stretch` prop can be used to specify a child component that will stretch to fill the excess space.
   */
  stretch?: Stretch;
  /**
   * The `switchAt` prop can be used to specify a breakpoint at which the items will switch to a column layout.
   */
  switchAt?: SwitchAt;
  /**
   * The `minItemWidth` prop can be used to specify a minimum width for all the children.
   */
  minItemWidth?: MinItemWidth;
  /**
   * The `justify` prop can be used to specify the inline alignment of the children.
   */
  justify?: "start" | "end" | "center" | "space-between" | "space-around";
  /**
   * The `align` prop can be used to specify the block alignment of the children.
   */
  align?: "start" | "end" | "center" | "stretch";
  /**
   * Sets padding on the component using design system spacing scale.
   */
  padding?: PaddingConfig;
  /**
   * Sets space between each element.
   */
  gap?: Gutter;
};

/**
 * The `Inline` component is designed to create consistent spacing between elements of variable width
 * in the inline direction. Unlike the `InlineCluster` component, the items in the `Inline` component
 * will not wrap.
 *
 * The `Inline` component also allows you to specify one of the children to stretch to fill the
 * excess space. This is done using the `stretch` prop. The `stretch` prop can be set to `all` for all
 * children to stretch, or a number to stretch a specific child. The `stretch` prop can also be set to
 * `start` or `end` to stretch the first or last child respectively.
 */
export const Inline = forwardRefWithAs<"div", InlineProps>(function Inline(
  {
    as: Component = "div",
    justify,
    align,
    gap,
    stretch,
    style = {},
    switchAt,
    minItemWidth,
    padding,
    ...props
  },
  ref,
) {
  const justifyValue = createAttributeString("justify", justify);
  const alignValue = createAttributeString("align", align ?? "center");
  const stretchValue = createAttributeString(
    "stretch",
    validateStretch(stretch),
  );
  const paddingAttrs = getPaddingAttributes(padding);

  const maybeMinItemWidth = validateCSSLengthOrNumber(minItemWidth);
  const switchAtValue = validateCSSLengthOrNumber(switchAt);

  const attributes = [justifyValue, alignValue, stretchValue, ...paddingAttrs]
    .filter(Boolean)
    .join(" ");

  const styles = {
    "--gap": getSafeGutter(gap),
    ...(switchAtValue !== undefined && { "--switch-at": switchAtValue }),
    ...(maybeMinItemWidth !== undefined && {
      "--min-item-width": maybeMinItemWidth,
    }),
    ...style,
  } as CSSProperties;

  return (
    <Component
      ref={ref}
      data-br-inline={attributes}
      style={styles}
      {...props}
    />
  );
});

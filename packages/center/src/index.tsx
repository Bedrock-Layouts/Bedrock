import {
  CSSLength,
  SizesOptions,
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

/**
 * The `maxWidth` prop can be a CSSLength, a number, or a key of the theme's sizes options.
 */
export type MaxWidth = number | CSSLength | SizesOptions;

/**
 * Props for the Center component.
 */
export type CenterProps = {
  /**
   * Sets the max-inline size of the component.
   * The `maxWidth` prop can be a CSSLength, a number, or a key of the theme's sizes options.
   */
  maxWidth?: MaxWidth;
  /**
   * Sets padding on the component using design system spacing scale.
   */
  padding?: PaddingConfig;
};

/**
 * The `Center` component is designed to center and clamp its width at a predefined value.
 */
export const Center = forwardRefWithAs<"div", CenterProps>(function Center(
  { as: Component = "div", maxWidth, padding, style = {}, ...props },
  ref,
) {
  const paddingAttrs = getPaddingAttributes(padding);
  const attrString = paddingAttrs.join(" ");

  const maybeMaxWidth = validateCSSLengthOrNumber(maxWidth);

  const styles = {
    ...(maybeMaxWidth !== undefined && { "--max-width": maybeMaxWidth }),
    ...style,
  } as CSSProperties;

  return (
    <Component
      data-br-center={attrString}
      ref={ref}
      style={styles}
      {...props}
    />
  );
});

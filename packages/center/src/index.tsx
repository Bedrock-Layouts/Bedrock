import {
  CSSLength,
  SizesOptions,
  getSizeValue,
  PaddingConfig,
  getPaddingAttributes,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

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

  return (
    <Component
      data-br-center={attrString}
      ref={ref}
      style={
        {
          "--max-width": getSizeValue(maxWidth) ?? maxWidth,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
});

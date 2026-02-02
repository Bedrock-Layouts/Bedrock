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

/**
 * `minHeight` can be a CSSLength, a number, or a key of the theme's sizes object
 */
export type MinHeight = CSSLength | number | SizesOptions;

/**
 * Props for the Cover component.
 */
export type CoverProps = {
  /**
   * Sets space between each element.
   */
  gap?: Gutter;
  /**
   * Sets the minimum height of the cover component.
   * `minHeight` can be a CSSLength, a number, or a key of the theme's sizes object
   * @default "100%"
   */
  minHeight?: MinHeight;
  /**
   * Sets the content to stretch to the full height of the cover component.
   */
  variant?: "default" | "stretch-content";
  /**
   * Sets padding on the component using design system spacing scale.
   */
  padding?: PaddingConfig;
};

/**
 * The `CoverCentered` component is used to mark the centered child in a Cover layout.
 */
export const CoverCentered = forwardRefWithAs<"div">(function CoverCentered(
  { as: Component = "div", ...props },
  ref,
) {
  return <Component ref={ref} data-br-cover-centered="" {...props} />;
});

/**
 * The `Cover` component is designed to vertically cover a predefined area, `100%` by default, and vertically center its children.
 */
export const Cover = forwardRefWithAs<"div", CoverProps>(function Cover(
  {
    as: Component = "div",
    children,
    gap,
    minHeight,
    style = {},
    variant = "default",
    padding,
    ...props
  },
  ref,
) {
  const maybeGutter = getSafeGutter(gap);
  const maybeMinHeight = getSizeValue(minHeight);

  const attributeVal = variant === "stretch-content" ? "stretch-content" : "";

  const paddingAttrs = getPaddingAttributes(padding);

  const attrs = [attributeVal, ...paddingAttrs].filter(Boolean).join(" ");

  return (
    <Component
      ref={ref}
      data-br-cover={attrs}
      style={
        {
          "--gap": maybeGutter,
          "--min-height": maybeMinHeight,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </Component>
  );
});

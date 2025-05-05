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

/**
 * `minHeight` can be a CSSLength, a number, or a key of the theme's sizes object
 */
export type MinHeight = CSSLength | number | SizesOptions;

/**
 * Props for the Cover component.
 */
export type CoverProps = {
  /**
   * Slot to be placed at the top of the cover component, above the centered content.
   */
  top?: React.ReactNode;
  /**
   * Slot to be placed at the bottom of the cover component, below the centered content.
   */
  bottom?: React.ReactNode;
  /**
   * Sets space between each element.
   * @deprecated Use `gap` instead.
   */
  gutter?: Gutter;
  /**
   * Sets space between each element.
   */
  gap?: Gutter;
  /**
   * Sets the minimum height of the cover component.
   * `minHeight` can be a CSSLength, a number, or a key of the theme's sizes object
   * @default "100vh"
   */
  minHeight?: MinHeight;
  /**
   * Sets the content to stretch to the full height of the cover component minus the top and bottom slots.
   * @deprecated Use `variant` set to `stretch-content` instead.
   */
  stretchContent?: boolean;
  /**
   * Sets the content to stretch to the full height of the cover component minus the top and bottom slots.
   */
  variant?: "default" | "stretch-content";
};

/**
 * The `Cover` component is designed to vertically cover a predefined area, `100vh` by default, and vertically center its children.
 * You can also conditionally render a top and/or bottom slot as well.
 */
export const Cover = forwardRefWithAs<"div", CoverProps>(function Cover(
  {
    as: Component = "div",
    children,
    gap,
    gutter,
    top,
    bottom,
    minHeight,
    style = {},
    stretchContent,
    variant = "default",
    ...props
  },
  ref,
) {
  const theme = useTheme();
  const maybeGutter = getSafeGutter(theme, gap ?? gutter);
  const maybeMinHeight = getSizeValue(theme, minHeight);

  const attributeVal =
    variant === "stretch-content" || stretchContent === true
      ? "stretch-content"
      : "";

  return (
    <Component
      ref={ref}
      data-br-cover={attributeVal}
      style={
        {
          "--gutter": maybeGutter,
          "--minHeight": maybeMinHeight,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {top && <div data-br-cover-top="">{top}</div>}
      <div data-br-cover-centered="">{children}</div>
      {bottom && <div data-br-cover-bottom="">{bottom}</div>}
    </Component>
  );
});

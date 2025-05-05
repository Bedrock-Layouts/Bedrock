import {
  CSSLength,
  Gutter,
  SizesOptions,
  getSafeGutter,
  getSizeValue,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React from "react";

/**
 * The `minItemWidth` prop can be a CSSLength, a number, or a key of the theme's sizes options.
 */
type MinItemWidth = number | CSSLength | SizesOptions;

/**
 * Props for the Grid component.
 */
export type GridProps = {
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
   * Sets the minimum width of each child.
   * The `minItemWidth` prop can be a CSSLength, a number, or a key of the theme's sizes options.
   */
  minItemWidth?: MinItemWidth;
  /**
   * The `variant` prop can be set to "grid" or "masonry".
   */
  variant?: "grid" | "masonry";
};

/**
 * The `Grid` component is designed to create a responsive grid of items
 * that will automatically wrap based on the number of children and the `minItemWidth`.
 */
export const Grid = forwardRefWithAs<"div", GridProps>(function Grid(
  {
    as: Component = "div",
    style = {},
    minItemWidth,
    gap,
    gutter,
    variant,
    ...props
  },
  ref,
) {
  const theme = useTheme();
  const maybeMinItemWidth = getSizeValue(theme, minItemWidth);
  const maybeGutter = getSafeGutter(theme, gap ?? gutter);

  const attributeValue = variant === "masonry" ? "variant:masonry" : true;

  return (
    <Component
      ref={ref}
      data-br-grid={attributeValue}
      style={
        {
          "--minItemWidth": maybeMinItemWidth,
          "--gutter": maybeGutter,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
});

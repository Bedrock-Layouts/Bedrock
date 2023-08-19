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
export interface GridProps {
  /**
   * Sets space between each element.
   */
  gutter?: Gutter;
  /**
   * Sets the minimum width of each child.
   * The `minItemWidth` prop can be a CSSLength, a number, or a key of the theme's sizes options.
   */
  minItemWidth?: MinItemWidth;
}

/**
 * The `Grid` component is designed to create a responsive grid of items
 * that will automatically wrap based on the number of children and the `minItemWidth`.
 */
export const Grid = forwardRefWithAs<"div", GridProps>(function Grid(
  { as, style, minItemWidth, gutter, ...props },
  ref,
) {
  const theme = useTheme();
  const safeMinItemWidth = getSizeValue(theme, minItemWidth);

  const safeGutter = getSafeGutter(theme, gutter);
  const safeStyle = style ?? {};
  const Component = as ?? "div";
  return (
    <Component
      ref={ref}
      data-bedrock-grid
      style={
        {
          ...safeStyle,
          "--minItemWidth": safeMinItemWidth,
          "--gutter": safeGutter,
        } as React.CSSProperties
      }
      {...props}
    />
  );
});

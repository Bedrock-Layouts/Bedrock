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
   */
  gutter?: Gutter;
  /**
   * Sets the minimum width of each child.
   * The `minItemWidth` prop can be a CSSLength, a number, or a key of the theme's sizes options.
   */
  minItemWidth?: MinItemWidth;
};

/**
 * The `Grid` component is designed to create a responsive grid of items
 * that will automatically wrap based on the number of children and the `minItemWidth`.
 */
export const Grid = forwardRefWithAs<"div", GridProps>(function Grid(
  { as: Component = "div", style = {}, minItemWidth, gutter, ...props },
  ref,
) {
  const theme = useTheme();
  const maybeMinItemWidth = getSizeValue(theme, minItemWidth);
  const maybeGutter = getSafeGutter(theme, gutter);

  return (
    <Component
      ref={ref}
      data-bedrock-grid
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

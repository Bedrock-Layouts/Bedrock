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
 * The `minItemWidth` prop can be a CSSLength, a number, or a key of the theme's sizes options.
 */
type MinItemWidth = number | CSSLength | SizesOptions;

/**
 * Props for the ColumnDrop component.
 */
export type ColumnDropProps = {
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
   * Prevents columns from stretching to fill the space.
   * @deprecated use `variant` set to `centered` instead.
   */
  noStretchedColumns?: boolean;
  /**
   * Setting it to `centered` will prevents columns from stretching to fill the space.
   */
  variant?: "default" | "centered";
};

/**
 * The `ColumnDrop` component is used to create a layout
 * of columns that stretch to fit the space, and snaps
 * to the next row at a minimum size. As columns drop
 * down to a new row, they will be laid out independently
 * of the column layout above. This component is useful for
 * creating a responsive grid.
 */
export const ColumnDrop = forwardRefWithAs<"div", ColumnDropProps>(
  function ColumnDrop(
    {
      as: Component = "div",
      gutter,
      gap,
      style = {},
      minItemWidth,
      noStretchedColumns = false,
      variant = "default",
      ...props
    },
    ref,
  ) {
    const theme = useTheme();
    const maybeGutter = getSafeGutter(theme, gap ?? gutter);

    const attributeValue =
      variant === "centered" || noStretchedColumns === true
        ? "no-stretched-columns"
        : "";

    const maybeMinItemWidth = getSizeValue(theme, minItemWidth);

    return (
      <Component
        ref={ref}
        data-br-column-drop={attributeValue}
        style={
          {
            "--gutter": maybeGutter,
            "--minItemWidth": maybeMinItemWidth,
            ...style,
          } as CSSProperties
        }
        {...props}
      />
    );
  },
);

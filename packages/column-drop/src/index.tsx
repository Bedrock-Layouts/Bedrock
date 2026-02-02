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
 * The `minItemWidth` prop can be a CSSLength, a number, or a key of the theme's sizes options.
 */
type MinItemWidth = number | CSSLength | SizesOptions;

/**
 * Props for the ColumnDrop component.
 */
export type ColumnDropProps = {
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
   * Setting it to `centered` will prevents columns from stretching to fill the space.
   */
  variant?: "default" | "centered";
  /**
   * Sets padding on the component using design system spacing scale.
   */
  padding?: PaddingConfig;
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
      gap,
      style = {},
      minItemWidth,
      variant = "default",
      padding,
      ...props
    },
    ref,
  ) {
    const maybeGutter = getSafeGutter(gap);

    const attributeValue = variant === "centered" ? "variant:centered" : "";

    const paddingAttrs = getPaddingAttributes(padding);

    const attrs = [attributeValue, ...paddingAttrs].filter(Boolean).join(" ");

    const maybeMinItemWidth = getSizeValue(minItemWidth);

    return (
      <Component
        ref={ref}
        data-br-column-drop={attrs}
        style={
          {
            "--gap": maybeGutter,
            "--min-item-width": maybeMinItemWidth,
            ...style,
          } as CSSProperties
        }
        {...props}
      />
    );
  },
);

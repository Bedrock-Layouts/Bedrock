import {
  CSSLength,
  SizesOptions,
  getSizeValue,
  useTheme,
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
   * Sets the text alignment of the component to center.
   */
  centerText?: boolean;
  /**
   * Sets the alignment of the component's children to be centered.
   * @deprecated Use with the stack component set to align="center" instead.
   */
  centerChildren?: boolean;
};

/**
 * The `Center` component is designed to center and clamp its width at a predefined value.
 * You can also center the children and text alignment as well.
 */
export const Center = forwardRefWithAs<"div", CenterProps>(function Center(
  {
    as: Component = "div",
    centerChildren,
    centerText,
    maxWidth,
    style = {},
    ...props
  },
  ref,
) {
  const theme = useTheme();
  const centerProps = [
    centerText && "center-text",
    centerChildren && "center-children",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      data-br-center={centerProps}
      ref={ref}
      style={
        {
          "--maxWidth": getSizeValue(theme, maxWidth) ?? maxWidth,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
});

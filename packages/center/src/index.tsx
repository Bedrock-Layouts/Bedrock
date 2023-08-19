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
export interface CenterProps {
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
   */
  centerChildren?: boolean;
}

/**
 * The `Center` component is designed to center and clamp its width at a predefined value.
 * By default, this value is set to the `medium` breakpoint.
 * You can also center the children and text alignment as well.
 */
export const Center = forwardRefWithAs<"div", CenterProps>(function Center(
  { as, centerChildren, centerText, maxWidth, style, ...props },
  ref,
) {
  const theme = useTheme();
  const centerProps = [
    centerText && "center-text",
    centerChildren && "center-children",
  ]
    .filter((x) => x)
    .join(" ");

  const safeStyle = style ?? {};

  const Component = as ?? "div";

  return (
    <Component
      data-bedrock-center={centerProps}
      ref={ref}
      style={
        {
          "--maxWidth":
            typeof maxWidth === "number" && maxWidth > 0
              ? `${maxWidth}px`
              : getSizeValue(theme, maxWidth) ?? maxWidth,
          ...safeStyle,
        } as CSSProperties
      }
      {...props}
    />
  );
});

Center.displayName = "Center";

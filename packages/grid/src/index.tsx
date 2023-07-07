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

type MinItemWidth = number | CSSLength | SizesOptions;
export interface GridProps {
  gutter?: Gutter;
  minItemWidth?: MinItemWidth;
}

export const Grid = forwardRefWithAs<"div", GridProps>(
  ({ as, style, minItemWidth, gutter, ...props }, ref) => {
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
  },
);
Grid.displayName = "Grid";

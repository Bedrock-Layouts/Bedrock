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

type MinItemWidth = CSSLength | number | SizesOptions;

export interface ColumnDropProps {
  gutter?: Gutter;
  minItemWidth?: MinItemWidth;
  noStretchedColumns?: boolean;
}

function getSafeMinItemWidth(
  theme: {
    space?: { [key: string]: string };
    sizes?: { [key: string]: string };
  },
  minItemWidth?: MinItemWidth,
) {
  return getSizeValue(theme, minItemWidth);
}

export const ColumnDrop = forwardRefWithAs<"div", ColumnDropProps>(
  (
    { as, gutter, style, minItemWidth, noStretchedColumns = false, ...props },
    ref,
  ) => {
    const theme = useTheme();
    const maybeGutter = getSafeGutter(theme, gutter);

    const attributeValue =
      noStretchedColumns === true ? "no-stretched-columns" : "";

    const safeMinItemWidth = getSafeMinItemWidth(theme, minItemWidth);
    const safeStyle = style ?? {};

    const Component = as ?? "div";
    return (
      <Component
        ref={ref}
        data-bedrock-column-drop={attributeValue}
        style={
          {
            ...safeStyle,
            "--gutter": maybeGutter,
            "--minItemWidth": safeMinItemWidth,
          } as CSSProperties
        }
        {...props}
      />
    );
  },
);
ColumnDrop.displayName = "ColumnDrop";

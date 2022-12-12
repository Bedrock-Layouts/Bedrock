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

type MinHeight = CSSLength | number | SizesOptions;
export interface CoverProps {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  gutter?: Gutter;
  minHeight?: MinHeight;
  stretchContent?: boolean;
}

function getSafeMinHeight<T extends Record<string, unknown>>(
  theme: T,
  minHeight?: MinHeight
) {
  return getSizeValue(theme, minHeight);
}

export const Cover = forwardRefWithAs<"div", CoverProps>(
  (
    {
      as,
      children,
      gutter,
      top,
      bottom,
      minHeight,
      style,
      stretchContent,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const maybeGutter = getSafeGutter(theme, gutter);
    const safeMinHeight = getSafeMinHeight(theme, minHeight);

    const attributeVal = stretchContent === true ? "stretch-content" : "";

    const safeStyle = style ?? {};

    const Component = as ?? "div";
    return (
      <Component
        ref={ref}
        data-bedrock-cover={attributeVal}
        style={
          {
            ...safeStyle,
            "--gutter": maybeGutter,
            "--minHeight": safeMinHeight,
          } as CSSProperties
        }
        {...props}
      >
        {top && <div data-bedrock-cover-top="">{top}</div>}
        <div data-bedrock-cover-centered="">{children}</div>
        {bottom && <div data-bedrock-cover-bottom="">{bottom}</div>}
      </Component>
    );
  }
);

Cover.displayName = "Cover";

import { Center } from "@bedrock-layout/center";
import {
  CSSLength,
  SizesOptions,
  getSizeValue,
  sizes,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React from "react";

type BoundarySize = number | CSSLength | SizesOptions;
export interface AppBoundaryProps {
  boundarySize?: BoundarySize;
}

export const AppBoundary = forwardRefWithAs<"div", AppBoundaryProps>(
  ({ as, boundarySize, children, style, ...props }, ref) => {
    const theme = useTheme();
    const maybeSize = getSizeValue(theme, boundarySize);
    const safeStyle = style ?? {};
    const Component = as ?? "div";
    return (
      <Component
        data-bedrock-appboundary
        ref={ref}
        {...props}
        style={{
          padding: 0,
          maxInlineSize: "100%",
          height: "100%",
          ...safeStyle,
        }}
      >
        <Center maxWidth={maybeSize ?? sizes.sizeXxl}>{children}</Center>
      </Component>
    );
  }
);

AppBoundary.displayName = "AppBoundary";

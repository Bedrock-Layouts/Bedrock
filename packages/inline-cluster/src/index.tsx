import {
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

export interface InlineClusterProps {
  justify?: "start" | "end" | "center";
  align?: "start" | "end" | "center" | "stretch";
  gutter?: Gutter;
}

export const InlineCluster = forwardRefWithAs<"div", InlineClusterProps>(
  ({ as, justify, align, style, gutter, ...props }, ref) => {
    const theme = useTheme();
    const justifyValue = justify ? `justify:${justify}` : undefined;
    const alignValue = align ? `align:${align}` : undefined;

    const attributes = [justifyValue, alignValue].filter(Boolean).join(" ");

    const safeStyle = style ?? {};

    const Component = as ?? "div";

    return (
      <Component
        data-bedrock-inline-cluster={attributes}
        ref={ref}
        style={
          {
            ...safeStyle,
            "--gutter": getSafeGutter(theme, gutter),
          } as CSSProperties
        }
        {...props}
      />
    );
  }
);

InlineCluster.displayName = "InlineCluster";

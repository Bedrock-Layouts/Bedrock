import {
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

export interface ReelProps {
  snapType?: "none" | "proximity" | "mandatory";
  gutter?: Gutter;
}

export const Reel = forwardRefWithAs<"div", ReelProps>(
  ({ as, snapType, gutter, style, ...props }, ref) => {
    const theme = useTheme();
    const maybeGutter = getSafeGutter(theme, gutter);
    const safeStyle = style ?? {};

    const Component = as ?? "div";
    return (
      <Component
        ref={ref}
        data-bedrock-reel={snapType ? `snapType:${snapType}` : ""}
        style={{ ...safeStyle, "--gutter": maybeGutter } as CSSProperties}
        {...props}
      />
    );
  }
);

Reel.displayName = "Reel";

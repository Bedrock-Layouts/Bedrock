import {
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

/**
 * Props for the Reel component.
 */
export interface ReelProps {
  /**
   * Sets the scroll snap type.
   */
  snapType?: "none" | "proximity" | "mandatory";
  /**
   * Sets space between each element.
   */
  gutter?: Gutter;
}

/**
 * Scrolling is a popular and natural way to interact with
 * web content. The `Reel` component is designed to organize
 * content into scrollable horizontal list with convenient scroll
 * snap points.
 */
export const Reel = forwardRefWithAs<"div", ReelProps>(function Reel(
  { as, snapType, gutter, style, ...props },
  ref,
) {
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
});

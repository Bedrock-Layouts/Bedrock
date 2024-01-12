import {
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React from "react";

/**
 * Props for Stack component.
 */
export interface StackProps {
  /**
   * Sets space between each element.
   */
  gutter?: Gutter;
}

/**
 * The `Stack` is designed to literally stack items on top of each other while maintaining a consistent gutter between each item.
 */
export const Stack = forwardRefWithAs<"div", StackProps>(function Stack(
  { as: Component = "div", gutter, style = {}, ...props },
  ref,
) {
  const theme = useTheme();
  const maybeGutter = getSafeGutter(theme, gutter);

  return (
    <Component
      ref={ref}
      data-bedrock-stack
      style={{ "--gutter": maybeGutter, ...style } as React.CSSProperties}
      {...props}
    />
  );
});

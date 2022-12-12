import {
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
  forwardRefWithAs,
} from "@bedrock-layout/type-utils";
import React from "react";

export interface StackProps {
  gutter?: Gutter;
}

export const Stack = forwardRefWithAs<"div", StackProps>(
  ({ as, gutter, style, ...props }, ref) => {
    const theme = useTheme();
    const maybeGutter = getSafeGutter(theme, gutter);
    const safeStyle = style ?? {};

    const Component = as ?? "div";
    return (
      <Component
        ref={ref}
        data-bedrock-stack
        style={{ ...safeStyle, "--gutter": maybeGutter } as React.CSSProperties}
        {...props}
      />
    );
  }
);
Stack.displayName = "Stack";

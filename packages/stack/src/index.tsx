import {
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@bedrock-layout/type-utils";
import React, { ElementType, forwardRef } from "react";

interface StackPropsBase {
  gutter?: Gutter;
}

export type StackProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, StackPropsBase>;

export const Stack = forwardRef(
  <C extends ElementType = "div">(
    { as, gutter, style, ...props }: StackProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
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

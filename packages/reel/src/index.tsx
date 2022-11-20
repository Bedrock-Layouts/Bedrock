import {
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@bedrock-layout/type-utils";
import React, { CSSProperties, ElementType, forwardRef } from "react";

interface ReelPropsBase {
  snapType?: "none" | "proximity" | "mandatory";
  gutter?: Gutter;
}

export type ReelProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, ReelPropsBase>;

export const Reel = forwardRef(
  <C extends ElementType = "div">(
    { as, snapType, gutter, style, ...props }: ReelProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
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

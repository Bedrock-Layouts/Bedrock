import {
  CSSLength,
  Gutter,
  SizesOptions,
  getSafeGutter,
  getSizeValue,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@bedrock-layout/type-utils";
import React, { ElementType, forwardRef } from "react";

type MinItemWidth = number | CSSLength | SizesOptions;
interface GridPropsBase {
  gutter?: Gutter;
  minItemWidth?: MinItemWidth;
}

export type GridProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, GridPropsBase>;

export const Grid = forwardRef(
  <C extends ElementType = "div">(
    { as, style, minItemWidth, gutter, ...props }: GridProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const theme = useTheme();
    const safeMinItemWidth = getSizeValue(theme, minItemWidth);

    const safeGutter = getSafeGutter(theme, gutter);
    const safeStyle = style ?? {};
    const Component = as ?? "div";
    return (
      <Component
        ref={ref}
        data-bedrock-grid
        style={
          {
            ...safeStyle,
            "--minItemWidth": safeMinItemWidth,
            "--gutter": safeGutter,
          } as React.CSSProperties
        }
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

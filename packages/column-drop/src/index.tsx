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
import React, { CSSProperties, ElementType, forwardRef } from "react";

type MinItemWidth = CSSLength | number | SizesOptions;

interface ColumnDropPropsBase {
  gutter?: Gutter;
  minItemWidth?: MinItemWidth;
  noStretchedColumns?: boolean;
}

export type ColumnDropProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, ColumnDropPropsBase>;

function getSafeMinItemWidth<T extends Record<string, unknown>>(
  theme: T,
  minItemWidth?: MinItemWidth
) {
  return getSizeValue(theme, minItemWidth);
}

export const ColumnDrop = forwardRef(
  <C extends ElementType = "div">(
    {
      as,
      gutter,
      style,
      minItemWidth,
      noStretchedColumns = false,
      ...props
    }: ColumnDropProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const theme = useTheme();
    const maybeGutter = getSafeGutter(theme, gutter);

    const attributeValue =
      noStretchedColumns === true ? "no-stretched-columns" : "";

    const safeMinItemWidth = getSafeMinItemWidth(theme, minItemWidth);
    const safeStyle = style ?? {};

    const Component = as ?? "div";
    return (
      <Component
        ref={ref}
        data-bedrock-column-drop={attributeValue}
        style={
          {
            ...safeStyle,
            "--gutter": maybeGutter,
            "--minItemWidth": safeMinItemWidth,
          } as CSSProperties
        }
        {...props}
      />
    );
  }
);
ColumnDrop.displayName = "ColumnDrop";

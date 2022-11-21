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

type MinHeight = CSSLength | number | SizesOptions;
interface CoverPropsBase {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  gutter?: Gutter;
  minHeight?: MinHeight;
  stretchContent?: boolean;
}

export type CoverProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, CoverPropsBase>;

function getSafeMinHeight<T extends Record<string, unknown>>(
  theme: T,
  minHeight?: MinHeight
) {
  return getSizeValue(theme, minHeight);
}

export const Cover = forwardRef(
  <C extends ElementType = "div">(
    {
      as,
      children,
      gutter,
      top,
      bottom,
      minHeight,
      style,
      stretchContent,
      ...props
    }: CoverProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const theme = useTheme();
    const maybeGutter = getSafeGutter(theme, gutter);
    const safeMinHeight = getSafeMinHeight(theme, minHeight);

    const attributeVal = stretchContent === true ? "stretch-content" : "";

    const safeStyle = style ?? {};

    const Component = as ?? "div";
    return (
      <Component
        ref={ref}
        data-bedrock-cover={attributeVal}
        style={
          {
            ...safeStyle,
            "--gutter": maybeGutter,
            "--minHeight": safeMinHeight,
          } as CSSProperties
        }
        {...props}
      >
        {top && <div data-bedrock-cover-top="">{top}</div>}
        <div data-bedrock-cover-centered="">{children}</div>
        {bottom && <div data-bedrock-cover-bottom="">{bottom}</div>}
      </Component>
    );
  }
);

Cover.displayName = "Cover";

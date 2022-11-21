import {
  CSSLength,
  Gutter,
  SizesOptions,
  checkIsCSSLength,
  getSafeGutter,
  getSizeValue,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@bedrock-layout/type-utils";
import React, { CSSProperties, ElementType, forwardRef } from "react";

type MinItemWidth = number | CSSLength | SizesOptions;
type Stretch = "all" | "start" | "end" | number;
type SwitchAt = CSSLength | number;

export interface InlinePropsBase {
  stretch?: Stretch;
  switchAt?: SwitchAt;
  minItemWidth?: MinItemWidth;
  justify?: "start" | "end" | "center";
  align?: "start" | "end" | "center" | "stretch";
  gutter?: Gutter;
}

export type InlineProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, InlinePropsBase>;

function shouldUseSwitch(switchAt?: SwitchAt) {
  if (switchAt === undefined) {
    return false;
  }

  return typeof switchAt === "string"
    ? checkIsCSSLength(switchAt)
    : switchAt > -1;
}

export const Inline = forwardRef(
  <C extends ElementType = "div">(
    {
      as,
      justify,
      align,
      gutter,
      stretch,
      style,
      switchAt,
      minItemWidth,
      ...props
    }: InlineProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const theme = useTheme();
    const justifyValue = justify ? `justify:${justify}` : undefined;
    const alignValue = align ? `align:${align}` : undefined;

    const stretchValue = stretch ? `stretch:${stretch}` : undefined;
    const attributes = [justifyValue, alignValue, stretchValue]
      .filter(Boolean)
      .join(" ");
    const safeMinItemWidth = getSizeValue(theme, minItemWidth) ?? minItemWidth;
    const switchAtValue = shouldUseSwitch(switchAt)
      ? typeof switchAt === "string"
        ? switchAt
        : `${switchAt}px`
      : undefined;

    const safeStyle = style ?? {};

    const Component = as ?? "div";

    return (
      <Component
        ref={ref}
        data-bedrock-inline={attributes}
        style={
          {
            ...safeStyle,
            "--gutter": getSafeGutter(theme, gutter),
            "--switchAt": switchAtValue,
            "--minItemWidth":
              typeof safeMinItemWidth === "number"
                ? `${safeMinItemWidth}px`
                : safeMinItemWidth,
          } as CSSProperties
        }
        {...props}
      />
    );
  }
);

Inline.displayName = "Inline";

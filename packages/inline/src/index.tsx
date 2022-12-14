import {
  CSSLength,
  Gutter,
  SizesOptions,
  checkIsCSSLength,
  getSafeGutter,
  getSizeValue,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

type MinItemWidth = number | CSSLength | SizesOptions;
type Stretch = "all" | "start" | "end" | number;
type SwitchAt = CSSLength | number;

export interface InlineProps {
  stretch?: Stretch;
  switchAt?: SwitchAt;
  minItemWidth?: MinItemWidth;
  justify?: "start" | "end" | "center";
  align?: "start" | "end" | "center" | "stretch";
  gutter?: Gutter;
}

function shouldUseSwitch(switchAt?: SwitchAt) {
  if (switchAt === undefined) {
    return false;
  }

  return typeof switchAt === "string"
    ? checkIsCSSLength(switchAt)
    : switchAt > -1;
}

export const Inline = forwardRefWithAs<"div", InlineProps>(
  (
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
    },
    ref
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
            "--minItemWidth": safeMinItemWidth,
          } as CSSProperties
        }
        {...props}
      />
    );
  }
);

Inline.displayName = "Inline";

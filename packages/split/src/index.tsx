import {
  CSSLength,
  Gutter,
  SizesOptions,
  getSafeGutter,
  getSizeValue,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

type FractionTypes =
  | "auto-start"
  | "auto-end"
  | "1/4"
  | "1/3"
  | "1/2"
  | "2/3"
  | "3/4";

type Fractions = {
  [key in FractionTypes]: string;
};

const fractions: Fractions = {
  "1/4": "fraction:1/4",
  "1/3": "fraction:1/3",
  "1/2": "fraction:1/2",
  "2/3": "fraction:2/3",
  "3/4": "fraction:3/4",
  "auto-start": `auto 1fr`,
  "auto-end": `1fr auto`,
};

type MinItemWidth = number | CSSLength | SizesOptions;
export interface SplitProps {
  gutter?: Gutter;
  fraction?: FractionTypes;
  switchAt?: number | CSSLength | SizesOptions;
  minItemWidth?: MinItemWidth;
}

export const Split = forwardRefWithAs<"div", SplitProps>(
  ({ as, fraction, gutter, minItemWidth, switchAt, style, ...props }, ref) => {
    const theme = useTheme();
    const attrString =
      fraction && fractions[fraction] ? `fraction:${fraction}` : "";

    const maybeGutter = getSafeGutter(theme, gutter);

    const safeMinItemWidth = getSizeValue(theme, minItemWidth) ?? minItemWidth;

    const safeSwitchAt = getSizeValue(theme, switchAt) ?? switchAt;
    const safeStyle = style ?? {};

    const Component = as ?? "div";

    return (
      <Component
        ref={ref}
        data-bedrock-split={attrString}
        style={
          {
            ...safeStyle,
            "--gutter": maybeGutter,
            "--minItemWidth": safeMinItemWidth,
            "--switchAt": safeSwitchAt,
          } as CSSProperties
        }
        {...props}
      />
    );
  },
);

Split.displayName = "Split";

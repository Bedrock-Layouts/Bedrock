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
interface SplitPropsBase {
  gutter?: Gutter;
  fraction?: FractionTypes;
  switchAt?: number | CSSLength | SizesOptions;
  minItemWidth?: MinItemWidth;
}

export type SplitProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, SplitPropsBase>;

export const Split = forwardRef(
  <C extends ElementType = "div">(
    {
      as,
      fraction,
      gutter,
      minItemWidth,
      switchAt,
      style,
      ...props
    }: SplitProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
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
            "--minItemWidth":
              typeof safeMinItemWidth === "number"
                ? `${safeMinItemWidth}px`
                : safeMinItemWidth,
            "--switchAt":
              typeof safeSwitchAt === "number"
                ? `${safeSwitchAt}px`
                : safeSwitchAt,
          } as CSSProperties
        }
        {...props}
      />
    );
  }
);

Split.displayName = "Split";

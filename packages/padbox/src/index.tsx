import {
  BaseTheme,
  Gutter,
  checkIsCSSLength,
  spacing as defaultSpacing,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@bedrock-layout/type-utils";
import React, { CSSProperties, ElementType, forwardRef } from "react";

type PaddingValue = Gutter;

type PaddingObj =
  | { left: PaddingValue }
  | { right: PaddingValue }
  | { top: PaddingValue }
  | { bottom: PaddingValue }
  | { inlineStart: PaddingValue }
  | { inlineEnd: PaddingValue }
  | { blockStart: PaddingValue }
  | { blockEnd: PaddingValue };

type PaddingTypes =
  | PaddingValue
  | PaddingObj
  | [PaddingValue]
  | [PaddingValue, PaddingValue]
  | [PaddingValue, PaddingValue, PaddingValue]
  | [PaddingValue, PaddingValue, PaddingValue, PaddingValue];

const validKeys = new Set([
  "left",
  "right",
  "top",
  "bottom",
  "inlineStart",
  "inlineEnd",
  "blockStart",
  "blockEnd",
]);

const keyToProperty = (key: string) => {
  type map = { [s: string]: string };
  const modernMap: map = {
    left: `padding-inline-start`,
    right: `padding-inline-end`,
    top: `padding-block-start`,
    bottom: `padding-block-end`,
    inlineStart: `padding-inline-start`,
    inlineEnd: `padding-inline-end`,
    blockStart: `padding-block-start`,
    blockEnd: `padding-block-end`,
  };

  return modernMap[key];
};

const paddingToStyleProps = (theme: BaseTheme, padding: PaddingTypes) => {
  if (Array.isArray(padding) && padding.length > 4) {
    throw new Error("padding arrays can only be 4 or less in length");
  }

  const validSpacings = new Set(Object.keys(theme.spacing ?? defaultSpacing));

  const isValidPadding = () => {
    if (typeof padding === "number" || typeof padding === "string") {
      return (
        padding > 0 ||
        validSpacings.has(padding.toString()) ||
        checkIsCSSLength(padding.toString())
      );
    }

    if (Array.isArray(padding)) {
      return padding.every((val) => {
        return (
          val > 0 ||
          validSpacings.has(val.toString()) ||
          checkIsCSSLength(val.toString())
        );
      });
    }

    return (
      padding !== undefined &&
      Object.keys(padding).every((key) => validKeys.has(key)) &&
      Object.values(padding).every((val) => {
        return (
          val > 0 ||
          validSpacings.has(val.toString()) ||
          checkIsCSSLength(val.toString())
        );
      })
    );
  };

  if (!isValidPadding()) {
    console.error("Invalid padding Type: ", padding);
  }

  return typeof padding === "object" && !Array.isArray(padding)
    ? Object.entries(padding).reduce(
        (acc, [key, val]) => ({
          ...acc,
          [keyToProperty(key)]: getSafeGutter(theme, val) ?? "0px",
        }),
        {}
      )
    : {
        padding: Array.from(Array.isArray(padding) ? padding : [padding])
          .map((pad: Gutter) => getSafeGutter(theme, pad) ?? "0px")
          .join(" "),
      };
};

interface PadBoxPropsBase {
  padding?: PaddingTypes;
}

export type PadBoxProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, PadBoxPropsBase>;

export const PadBox = forwardRef(
  <C extends ElementType = "div">(
    { as, style, padding, ...props }: PadBoxProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const theme = useTheme();
    const safeStyle = style ?? {};

    const Component = as ?? "div";
    const paddingStyles = paddingToStyleProps(theme, padding ?? "size00");

    return (
      <Component
        data-bedrock-padbox
        {...props}
        ref={ref}
        style={{ ...safeStyle, ...paddingStyles } as CSSProperties}
      />
    );
  }
);

PadBox.displayName = "PadBox";

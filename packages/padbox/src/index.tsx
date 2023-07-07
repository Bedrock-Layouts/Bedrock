import {
  BaseTheme,
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

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

const paddingToStyleProps = (
  theme: { space?: BaseTheme },
  padding: PaddingTypes,
) => {
  if (Array.isArray(padding) && padding.length > 4) {
    throw new Error("padding arrays can only be 4 or less in length");
  }

  return typeof padding === "object" && !Array.isArray(padding)
    ? Object.entries(padding).reduce(
        (acc, [key, val]) => ({
          ...acc,
          [keyToProperty(key)]: getSafeGutter(theme, val) ?? "0px",
        }),
        {},
      )
    : {
        padding: Array.from(Array.isArray(padding) ? padding : [padding])
          .map((pad: Gutter) => getSafeGutter(theme, pad) ?? "0px")
          .join(" "),
      };
};

export interface PadBoxProps {
  padding?: PaddingTypes;
}

export const PadBox = forwardRefWithAs<"div", PadBoxProps>(
  ({ as, style, padding, ...props }, ref) => {
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
  },
);

PadBox.displayName = "PadBox";

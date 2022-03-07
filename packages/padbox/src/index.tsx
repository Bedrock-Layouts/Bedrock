import {
  BaseTheme,
  Gutter,
  checkIsCSSLength,
  spacing as defaultSpacing,
  getSafeGutter,
  validateGutter,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const keyToProperty = (key: string, val: string) => {
  type map = { [s: string]: string };
  const modernMap: map = {
    left: `padding-inline-start:${val};`,
    right: `padding-inline-end:${val};`,
    top: `padding-block-start:${val};`,
    bottom: `padding-block-end:${val};`,
    inlineStart: `padding-inline-start:${val};`,
    inlineEnd: `padding-inline-end:${val};`,
    blockStart: `padding-block-start:${val};`,
    blockEnd: `padding-block-end:${val};`,
  };

  return modernMap[key];
};

const paddingToString = (theme: BaseTheme, padding: PaddingTypes) => {
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
    console.error("Invalid padding Type");
  }

  return typeof padding === "object" && !Array.isArray(padding)
    ? Object.entries(padding).reduce(
        (acc, [key, val]) =>
          acc + keyToProperty(key, getSafeGutter(theme, val) ?? "0px"),
        ""
      )
    : `padding: ${Array.from(Array.isArray(padding) ? padding : [padding])
        .map((pad: Gutter) => getSafeGutter(theme, pad) ?? "0px")
        .join(" ")};`;
};

export interface PadBoxProps {
  padding?: PaddingTypes;
}

export const PadBox = styled.div.attrs<PadBoxProps>(() => ({
  "data-bedrock-padbox": "",
}))<PadBoxProps>`
  box-sizing: border-box;
  ${(props) =>
    props.padding !== undefined
      ? paddingToString(props.theme, props.padding)
      : ""}
`;

PadBox.displayName = "PadBox";

PadBox.propTypes = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  padding: PropTypes.oneOfType<any>([
    validateGutter,
    PropTypes.objectOf(validateGutter),
    PropTypes.arrayOf(validateGutter),
  ]).isRequired,
};

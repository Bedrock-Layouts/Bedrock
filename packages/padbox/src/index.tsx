import {
  BaseTheme,
  SpacingOptions,
  spacing as defaultSpacing,
  getSpacingValue,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

type SpacingTypes = keyof SpacingOptions;

type PaddingObj =
  | { left: SpacingTypes }
  | { right: SpacingTypes }
  | { top: SpacingTypes }
  | { bottom: SpacingTypes }
  | { inlineStart: SpacingTypes }
  | { inlineEnd: SpacingTypes }
  | { blockStart: SpacingTypes }
  | { blockEnd: SpacingTypes };

type PaddingTypes =
  | SpacingTypes
  | PaddingObj
  | [SpacingTypes]
  | [SpacingTypes, SpacingTypes]
  | [SpacingTypes, SpacingTypes, SpacingTypes]
  | [SpacingTypes, SpacingTypes, SpacingTypes, SpacingTypes];

type Theme = {
  spacing?: BaseTheme;
};

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

function paddingOrDefault(theme: Theme) {
  return (key: SpacingTypes) => {
    const maybePadding = getSpacingValue(theme, key);
    return maybePadding ?? "0px";
  };
}

const paddingToString = (theme: Theme) => (padding: PaddingTypes) => {
  if (Array.isArray(padding) && padding.length > 4) {
    throw new Error("padding arrays can only be 4 or less in length");
  }

  const validSpacings = new Set(Object.keys(theme.spacing ?? defaultSpacing));

  const isValidPadding = () => {
    if (typeof padding === "string") return true;

    if (Array.isArray(padding)) {
      return padding.every((val) => validSpacings.has(val));
    }

    return (
      padding &&
      Object.keys(padding).every((key) => validKeys.has(key)) &&
      Object.values(padding).every((val) => validSpacings.has(val))
    );
  };

  if (!isValidPadding()) {
    console.error("Invalid padding Type");
  }

  const getPadding = paddingOrDefault(theme);

  return typeof padding === "object" && !Array.isArray(padding)
    ? Object.entries(padding).reduce(
        (acc, [key, val]) =>
          validKeys.has(key) ? acc + keyToProperty(key, getPadding(val)) : acc,
        ""
      )
    : `padding: ${Array.from(Array.isArray(padding) ? padding : [padding])
        .map((pad: SpacingTypes) => getPadding(pad))
        .join(" ")}`;
};

export interface PadBoxProps {
  padding: PaddingTypes;
}

export const PadBox = styled.div.attrs<PadBoxProps>(() => ({
  "data-bedrock-padbox": "",
}))<PadBoxProps>`
  box-sizing: border-box;
  ${(props) => paddingToString(props.theme)(props.padding)}
`;

PadBox.displayName = "PadBox";

PadBox.propTypes = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  padding: PropTypes.oneOfType<any>([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

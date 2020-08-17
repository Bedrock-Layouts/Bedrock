import styled from "styled-components";
import PropTypes from "prop-types";
import {
  spacing as defaultSpacings,
  SpacingTypes,
  mergeSpacings,
} from "@bedrock-layout/spacing-constants";

const keyToProperty = (key: string) => {
  type map = { [s: string]: string };
  const modernMap: map = {
    left: "inline-start",
    right: "inline-end",
    top: "block-start",
    bottom: "block-end",
    inlineStart: "inline-start",
    inlineEnd: "inline-end",
    blockStart: "block-start",
    blockEnd: "block-end",
  };

  const classicMap: map = {
    left: "left",
    right: "right",
    top: "top",
    bottom: "bottom",
    inlineStart: "left",
    inlineEnd: "right",
    blockStart: "top",
    blockEnd: "bottom",
  };

  if (
    typeof CSS !== "undefined" &&
    !CSS.supports("padding-inline-start", "100px")
  ) {
    return classicMap[key];
  }

  return modernMap[key];
};

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

type PaddingToString = (spacing: object) => (padding?: PaddingTypes) => string;

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

const validSpacings = new Set(Object.keys(defaultSpacings));

const paddingToString: PaddingToString = (spacing = {}) => (padding = "lg") => {
  if (Array.isArray(padding) && padding.length > 4) {
    throw new Error("padding arrays can only be 4 or less in length");
  }

  const spacingMap = mergeSpacings(spacing);

  return typeof padding === "object" && !Array.isArray(padding)
    ? paddingObjToString(padding)
    : paddingArrToString(padding);

  function paddingArrToString(padArr: SpacingTypes | SpacingTypes[]) {
    if (
      Array.isArray(padArr) &&
      !padArr.every((val) => validSpacings.has(val))
    ) {
      console.error("Invalid padding Type");
    }

    return `padding: ${Array()
      .concat(padArr)
      .map((pad: SpacingTypes) => spacingMap[pad])
      .join(" ")};`;
  }

  function paddingObjToString(padObj: PaddingObj) {
    const padObjKeys = Object.keys(padObj);
    const padObjVals = Object.values(padObj);

    if (
      !padObjKeys.every((key) => validKeys.has(key)) ||
      !padObjVals.every((val) => validSpacings.has(val))
    ) {
      console.error("Invalid padding Type");
    }

    return Object.entries(padObj).reduce(
      (acc, [key, val]) =>
        validKeys.has(key)
          ? acc + `padding-${keyToProperty(key)}: ${spacingMap[val]};`
          : acc,
      ""
    );
  }
};

export interface PadBoxProps {
  padding?: PaddingTypes;
}

const PadBox = styled.div<PadBoxProps>`
  box-sizing: border-box;
  ${(props) => paddingToString(props.theme.spacing)(props.padding)}
`;

PadBox.displayName = "PadBox";

const spacingOptionsTypes = PropTypes.oneOf(Object.keys(defaultSpacings));

PadBox.propTypes = {
  padding: PropTypes.oneOfType<any>([
    spacingOptionsTypes,
    PropTypes.objectOf(spacingOptionsTypes),
    PropTypes.arrayOf(spacingOptionsTypes),
  ]),
};

PadBox.defaultProps = {
  padding: "lg",
};

export default PadBox;

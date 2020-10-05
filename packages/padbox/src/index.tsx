import {
  SpacingTypes,
  spacing as defaultSpacings,
  mergeSpacings,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

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
    const safePadArr = Array.isArray(padArr) ? padArr : [padArr];
    return `padding: ${safePadArr
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
        validKeys.has(key) ? acc + keyToProperty(key, spacingMap[val]) : acc,
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

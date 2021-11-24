import {
  SpacingOptions,
  getSpacingValue,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const justifyMap = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
} as const;

const alignMap = {
  ...justifyMap,
  stretch: "stretch",
} as const;

export interface InlineClusterProps {
  justify?: keyof typeof justifyMap;
  align?: keyof typeof alignMap;
  gutter: keyof SpacingOptions;
}

export const InlineCluster = styled.div.attrs<InlineClusterProps>(
  ({ justify, align }) => {
    const justifyValue = justify ? `justify:${justify}` : "justify:start";
    const alignValue = align ? `align:${align}` : "align:start";
    return {
      "data-bedrock-inline": `${justifyValue} ${alignValue}`,
      "data-bedrock-inline-cluster": undefined,
    };
  }
)<InlineClusterProps>`
  --gutter: ${({ gutter, theme }) => {
    const maybeGutter = getSpacingValue(theme, gutter);
    return maybeGutter ?? "0px";
  }};

  box-sizing: border-box;
  > * {
    margin: 0;
  }

  display: flex;
  flex-wrap: wrap;
  gap: var(--gutter);

  justify-content: ${(props) =>
    typeof props.justify !== "undefined" && justifyMap[props.justify]
      ? justifyMap[props.justify]
      : justifyMap.start};

  align-items: ${(props) =>
    typeof props.align !== "undefined" && alignMap[props.align]
      ? alignMap[props.align]
      : alignMap.start};
`;

InlineCluster.displayName = "InlineCluster";

InlineCluster.propTypes = {
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
  justify: PropTypes.oneOf<keyof typeof justifyMap>(["start", "center", "end"]),
  align: PropTypes.oneOf<keyof typeof alignMap>([
    "start",
    "center",
    "end",
    "stretch",
  ]),
};

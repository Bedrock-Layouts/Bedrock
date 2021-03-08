import {
  SpacingTypes,
  spacing as defaultSpacings,
  mergeSpacings,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

type JustifyAlignOptions = "start" | "center" | "end";

type JustifyAlignMap = { [key in JustifyAlignOptions]: string };
const justifyAlignMap: JustifyAlignMap = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
};

export interface InlineClusterProps {
  justify?: JustifyAlignOptions;
  align?: JustifyAlignOptions;
  gutter?: SpacingTypes;
}

const fallbackCss = css`
  margin: calc(var(--gutter) / 2 * -1);

  & > * {
    margin: calc(var(--gutter) / 2);
  }
`;

const gapSupportedCSS = css`
  gap: var(--gutter);
`;

//Logic forked from is-in-browser npm package
const isBrowser =
  typeof window === "object" &&
  typeof document === "object" &&
  document.nodeType === 9;

export function flexGapSupported(): boolean {
  if (!isBrowser) {
    return false;
  }

  const flexBox = document.createElement("div");
  flexBox.style.display = "flex";
  flexBox.style.flexDirection = "column";
  flexBox.style.gap = "1px";

  flexBox.appendChild(document.createElement("div"));
  flexBox.appendChild(document.createElement("div"));

  document.body.appendChild(flexBox);

  const isSupported = flexBox.scrollHeight === 1;

  flexBox.parentNode?.removeChild(flexBox);

  return isSupported;
}

const isFlexGapSupported = flexGapSupported();

const InlineCluster = styled.div.attrs<InlineClusterProps>(
  ({ children, gutter = "lg", theme: { spacing = {} } }) => {
    const safeGutter =
      gutter && mergeSpacings(spacing)[gutter]
        ? mergeSpacings(spacing)[gutter]
        : mergeSpacings(spacing).lg;
    return {
      style: {
        "--gutter": safeGutter,
      },
      children: isFlexGapSupported
        ? children
        : React.Children.map(children, (child) => <div>{child}</div>),
    };
  }
)<InlineClusterProps>`
  box-sizing: border-box;

  --gutter: 1rem;

  display: flex;
  flex-wrap: wrap;
  inline-size: 100%;

  justify-content: ${(props) =>
    typeof props.justify !== "undefined" && justifyAlignMap[props.justify]
      ? justifyAlignMap[props.justify]
      : justifyAlignMap.start};

  align-items: ${(props) =>
    typeof props.align !== "undefined" && justifyAlignMap[props.align]
      ? justifyAlignMap[props.align]
      : justifyAlignMap.start};

  ${isFlexGapSupported ? gapSupportedCSS : fallbackCss}
`;

InlineCluster.displayName = "InlineCluster";

InlineCluster.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
  justify: PropTypes.oneOf<JustifyAlignOptions>(["start", "center", "end"]),
  align: PropTypes.oneOf<JustifyAlignOptions>(["start", "center", "end"]),
};

export default InlineCluster;

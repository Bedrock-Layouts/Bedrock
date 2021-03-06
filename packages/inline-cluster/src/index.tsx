import {
  SpacingOptions,
  getSpacingValue,
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
  gutter: keyof SpacingOptions;
}

const justifyAlign = css<InlineClusterProps>`
  justify-content: ${(props) =>
    typeof props.justify !== "undefined" && justifyAlignMap[props.justify]
      ? justifyAlignMap[props.justify]
      : justifyAlignMap.start};

  align-items: ${(props) =>
    typeof props.align !== "undefined" && justifyAlignMap[props.align]
      ? justifyAlignMap[props.align]
      : justifyAlignMap.start};
`;

const fallbackCss = css`
  overflow: hidden;
  & > * {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    block-size: calc(100% + var(--gutter));

    ${justifyAlign}

    margin: calc(var(--gutter) / 2 * -1);
    & > * {
      margin: calc(var(--gutter) / 2);
    }
  }
`;

const gapSupportedCSS = css`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  ${justifyAlign}
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

export const isFlexGapSupported = flexGapSupported();

export const InlineCluster = styled.div.attrs<InlineClusterProps>(
  ({ children }) => {
    return {
      "data-bedrock-layout-inline-cluster": "",
      children: isFlexGapSupported ? children : <div>{children}</div>,
    };
  }
)<InlineClusterProps>`
  --gutter: ${({ gutter, theme }) => {
    const maybeGutter = getSpacingValue(theme, gutter);
    return maybeGutter ?? "0px";
  }};

  ${isFlexGapSupported ? gapSupportedCSS : fallbackCss}
`;

InlineCluster.displayName = "InlineCluster";

InlineCluster.propTypes = {
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
  justify: PropTypes.oneOf<JustifyAlignOptions>(["start", "center", "end"]),
  align: PropTypes.oneOf<JustifyAlignOptions>(["start", "center", "end"]),
};

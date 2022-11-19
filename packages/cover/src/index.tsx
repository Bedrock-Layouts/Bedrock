import {
  CSSLength,
  Gutter,
  SizesOptions,
  checkIsCSSLength,
  getSafeGutter,
  getSizeValue,
  sizes,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

type MinHeight = CSSLength | number | SizesOptions;
export interface CoverProps {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  gutter?: Gutter;
  minHeight?: MinHeight;
  stretchContent?: boolean;
}

function getSafeMinHeight<T extends Record<string, unknown>>(
  theme: T,
  minHeight?: MinHeight
) {
  return getSizeValue(theme, minHeight);
}

export const Cover = styled.div.attrs<CoverProps>(
  ({
    children,
    gutter,
    top,
    bottom,
    minHeight,
    theme,
    style,
    stretchContent,
  }) => {
    const maybeGutter = getSafeGutter(theme, gutter);
    const safeMinHeight = getSafeMinHeight(theme, minHeight);

    const attributeVal = stretchContent === true ? "stretch-content" : "";

    return {
      "data-bedrock-cover": attributeVal,
      style: {
        ...style,
        "--minHeight": safeMinHeight,
        "--gutter": maybeGutter,
      },
      children: (
        <React.Fragment>
          {top && <div data-bedrock-cover-top="">{top}</div>}
          <div data-bedrock-cover-centered="">{children}</div>
          {bottom && <div data-bedrock-cover-bottom="">{bottom}</div>}
        </React.Fragment>
      ),
    };
  }
)<CoverProps>`
  @property --gutter {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: 0;
  }

  @property --minHeight {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: 100vh;
  }

  > * {
    margin: 0;
  }

  display: flex;
  flex-direction: column;
  gap: var(--gutter, 0px);

  min-block-size: var(--minHeight, 100vh);

  > [data-bedrock-cover-centered] {
    margin-block-start: auto;
    margin-block-end: auto;

    ${({ stretchContent }) =>
      stretchContent === true &&
      css`
        flex: 1;
        display: flex;
        flex-direction: column;
        > * {
          flex: 1;
        }
      `};
  }
`;

Cover.displayName = "Cover";

function validateMinHeight({ minHeight }: CoverProps, propName: string) {
  if (minHeight === undefined) return;

  const isValid =
    typeof minHeight === "number" ||
    checkIsCSSLength(minHeight as string) ||
    Object.keys(sizes).includes(minHeight as string);

  if (!isValid) {
    console.error(
      `${propName} needs to be an number, CSSLength or SizesOptions`
    );
  }
  return;
}

Cover.propTypes = {
  minHeight: validateMinHeight as unknown as React.Validator<MinHeight>,
  top: PropTypes.element,
  bottom: PropTypes.element,
  stretchContent: PropTypes.bool,
};

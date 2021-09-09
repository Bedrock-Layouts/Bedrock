import {
  SpacingOptions,
  getSpacingValue,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import React, { Children } from "react";
import styled from "styled-components";

export interface CoverProps {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  gutter: keyof SpacingOptions;
  minHeight?: string;
}

export const Cover = styled.div.attrs<CoverProps>(
  ({ children, top, bottom }) => {
    return {
      "data-bedrock-layout-cover": "",
      children: (
        <React.Fragment>
          {top && (
            <div data-bedrock-layout-cover-top="">{Children.only(top)}</div>
          )}
          <div data-bedrock-layout-cover-child="">
            {Children.only(children)}
          </div>
          {bottom && (
            <div data-bedrock-layout-cover-bottom="">
              {Children.only(bottom)}
            </div>
          )}
        </React.Fragment>
      ),
    };
  }
)<CoverProps>`
  --minHeight: ${(props) => props.minHeight ?? ""};
  --gutter: ${({ gutter, theme }) => getSpacingValue(theme, gutter) ?? "0px"};
  --rows: ${({ top, bottom }) =>
    top && bottom
      ? "auto 1fr auto"
      : top
      ? "auto 1fr"
      : bottom
      ? "1fr auto"
      : "1fr"};

  > * {
    margin: 0;
  }

  display: grid;
  gap: var(--gutter);
  min-block-size: 100vh;
  grid-template-rows: var(--rows);

  > [data-bedrock-layout-cover-child] {
    align-self: center;
  }

  @supports (min-block-size: ${(props) => props.minHeight}) {
    min-block-size: var(--minHeight);
  }
`;

Cover.displayName = "Cover";

Cover.propTypes = {
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
  minHeight: PropTypes.string,
  top: PropTypes.element,
  bottom: PropTypes.element,
};

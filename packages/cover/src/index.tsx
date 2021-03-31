import {
  SpacingTypes,
  spacing as defaultSpacings,
  mergeSpacings,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import React, { Children } from "react";
import styled from "styled-components";

export interface CoverProps {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  gutter?: SpacingTypes;
  minHeight?: string;
}

const Cover = styled.div.attrs<CoverProps>(
  ({
    style,
    gutter = "lg",
    theme: { spacing = {} },
    children,
    top,
    bottom,
  }) => {
    const safeGutter =
      gutter && mergeSpacings(spacing)[gutter]
        ? mergeSpacings(spacing)[gutter]
        : mergeSpacings(spacing).lg;

    const rows: string =
      top && bottom
        ? "auto 1fr auto"
        : top
        ? "auto 1fr"
        : bottom
        ? "1fr auto"
        : "1fr";

    return {
      "data-bedrock-layout-cover": "",
      style: {
        ...style,
        "--gutter": safeGutter,
        "--rows": rows,
      },
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
  --gutter: 1rem;
  --rows: 1fr;

  display: grid;
  gap: var(--gutter);
  min-block-size: 100vh;
  grid-template-rows: var(--rows);

  > [data-bedrock-layout-cover-child] {
    align-self: center;
  }

  @supports (min-block-size: ${(props) => props.minHeight}) {
    min-block-size: ${(props) => props.minHeight};
  }
`;

Cover.displayName = "Cover";

Cover.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
  minHeight: PropTypes.string,
  top: PropTypes.element,
  bottom: PropTypes.element,
};

export default Cover;

import {
  SpacingTypes,
  spacing as defaultSpacings,
  mergeSpacings,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import PropTypes from "prop-types";
import React, { Children } from "react";
import styled from "styled-components";

interface CoverWrapperProps {
  gutter?: SpacingTypes;
  minHeight?: string;
}

const CoverWrapper = styled.div.attrs<CoverWrapperProps>(
  ({ style, gutter = "lg", theme: { spacing = {} } }) => {
    const safeGutter =
      gutter && mergeSpacings(spacing)[gutter]
        ? mergeSpacings(spacing)[gutter]
        : mergeSpacings(spacing).lg;
    return {
      style: {
        ...style,
        "--gutter": safeGutter,
      },
    };
  }
)<CoverWrapperProps>`
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

export interface CoverProps extends CoverWrapperProps {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
}

const Cover = forwardRefWithAs<CoverProps, "div">(
  ({ children, top, bottom, as, style, ...props }, ref) => {
    const rows: string =
      top && bottom
        ? "auto 1fr auto"
        : top
        ? "auto 1fr"
        : bottom
        ? "1fr auto"
        : "1fr";

    return (
      <CoverWrapper
        as={as}
        ref={ref}
        style={{ ...style, "--rows": rows } as React.CSSProperties}
        {...props}
      >
        {top && (
          <div data-bedrock-layout-cover-top="">{Children.only(top)}</div>
        )}
        <div data-bedrock-layout-cover-child="">{Children.only(children)}</div>
        {bottom && (
          <div data-bedrock-layout-cover-bottom="">{Children.only(bottom)}</div>
        )}
      </CoverWrapper>
    );
  }
);

Cover.displayName = "Cover";

Cover.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    (Object.keys(defaultSpacings) as unknown) as SpacingTypes[]
  ),
  minHeight: PropTypes.string,
  top: PropTypes.element,
};

export default Cover;

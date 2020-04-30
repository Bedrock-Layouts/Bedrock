import React, { Children } from 'react';
import styled from 'styled-components';
import PadBox, { PadBoxProps } from '@bedrock-layout/padbox';
import { forwardRefWithAs } from '@bedrock-layout/type-utils';
import PropTypes from 'prop-types';
import {
  spacing as defaultSpacings,
  SpacingTypes,
  mergeSpacings,
} from '@bedrock-layout/spacing-constants';

const VerticallyCentered = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-block-start: auto;
  margin-block-end: auto;
`;

interface CoverWrapperProps extends PadBoxProps {
  gutter?: SpacingTypes;
  minHeight?: string;
}

const CoverWrapper = styled(PadBox)<CoverWrapperProps>`
  --gutter: ${({ gutter, theme: { spacing = {} } }) =>
    gutter && mergeSpacings(spacing)[gutter]
      ? mergeSpacings(spacing)[gutter]
      : mergeSpacings(spacing).md};

  display: flex;
  flex-direction: column;
  min-height: ${(props) => props.minHeight || '100vh'};

  & > *:not(${VerticallyCentered}) {
    margin-top: var(--gutter);
    margin-bottom: var(--gutter);
    margin-block-start: var(--gutter);
    margin-block-end: var(--gutter);
  }
  & > :first-child:not(${VerticallyCentered}) {
    margin-top: 0;
  }

  & > :last-child:not(${VerticallyCentered}) {
    margin-bottom: 0;
  }
`;

export interface CoverProps extends CoverWrapperProps {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
}

const Cover = forwardRefWithAs<CoverProps, 'div'>(
  ({ children, top, bottom, as, ...props }, ref) => {
    return (
      <CoverWrapper as={as} ref={ref} {...props}>
        {top && Children.only(top)}
        <VerticallyCentered>{Children.only(children)}</VerticallyCentered>
        {bottom && Children.only(bottom)}
      </CoverWrapper>
    );
  }
);

Cover.displayName = 'Cover';

Cover.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
  minHeight: PropTypes.string,
  top: PropTypes.element,
};

export default Cover;

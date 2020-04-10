import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  spacing as defaultSpacings,
  SpacingTypes,
  mergeSpacings
} from '@bedrock-layout/spacing-constants';
import { forwardRefWithAs } from '@bedrock-layout/type-utils';

interface OuterWrapperProps {
  gutter?: SpacingTypes;
}
const OuterWrapper = styled.div<OuterWrapperProps>`
  box-sizing: border-box;

  --gutter: ${({ gutter, theme: { spacing = {} } }) =>
    gutter && mergeSpacings(spacing)[gutter]
      ? mergeSpacings(spacing)[gutter]
      : mergeSpacings(spacing).md};
`;

type JustifyAlignOptions = 'start' | 'center' | 'end';
interface InnerWrapperProps {
  justify?: JustifyAlignOptions;
  align?: JustifyAlignOptions;
}

type JustifyAlignMap = { [key in JustifyAlignOptions]: string };
const justifyAlignMap: JustifyAlignMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center'
};

const InnerWrapper = styled.div<InnerWrapperProps>`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props =>
    typeof props.justify !== 'undefined' && justifyAlignMap[props.justify]
      ? justifyAlignMap[props.justify]
      : justifyAlignMap.start};
  align-items: ${props =>
    typeof props.align !== 'undefined' && justifyAlignMap[props.align]
      ? justifyAlignMap[props.align]
      : justifyAlignMap.start};
  margin: calc(var(--gutter) / 2 * -1);
  & > * {
    margin: calc(var(--gutter) / 2);
  }
`;

export interface InlineClusterProps
  extends OuterWrapperProps,
    InnerWrapperProps {}

const InlineCluster = forwardRefWithAs<InlineClusterProps, 'div'>(
  ({ gutter, as, justify, align, children, ...props }, ref) => {
    return (
      <OuterWrapper ref={ref} as={as} gutter={gutter} {...props}>
        <InnerWrapper justify={justify} align={align}>
          {children}
        </InnerWrapper>
      </OuterWrapper>
    );
  }
);
InlineCluster.displayName = 'InlineCluster';

InlineCluster.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
  justify: PropTypes.oneOf<JustifyAlignOptions>(['start', 'center', 'end']),
  align: PropTypes.oneOf<JustifyAlignOptions>(['start', 'center', 'end'])
};

export default InlineCluster;

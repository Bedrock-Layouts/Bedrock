import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  spacing as spacingMap,
  SpacingTypes,
} from '@bedrock-layout/spacing-constants';

export interface StackProps {
  gutter?: SpacingTypes;
}

const Stack = styled.div<StackProps>`
  display: grid;
  grid-auto-columns: 100%;
  grid-gap: ${({ gutter, theme: { spacing = spacingMap } }) =>
    gutter ? spacing[gutter] : spacing.md};
`;

if (__DEV__) {
  Stack.displayName = 'Stack';
  Stack.propTypes = {
    gutter: PropTypes.oneOf(['none', 'xs', 'sm', 'ms', 'lg', 'xl', 'xxl']),
  };
}

export default Stack;

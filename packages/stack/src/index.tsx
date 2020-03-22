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
  box-sizing: border-box;

  display: grid;
  grid-auto-columns: 100%;
  grid-gap: ${({ gutter, theme: { spacing = spacingMap } }) =>
    gutter && spacing[gutter] ? spacing[gutter] : spacing.md};

  @supports not (grid-gap: 1rem) {
    display: flex;
    flex-flow: column;

    * + * {
      margin-top: ${({ gutter, theme: { spacing = spacingMap } }) =>
        gutter && spacing[gutter] ? spacing[gutter] : spacing.md};
    }
  }
`;

Stack.displayName = 'Stack';

Stack.propTypes = {
  gutter: PropTypes.oneOf(Object.keys(spacingMap) as SpacingTypes[]),
};

export default Stack;

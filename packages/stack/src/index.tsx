import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  spacing as defaultSpacings,
  SpacingTypes,
} from '@bedrock-layout/spacing-constants';

export interface StackProps {
  gutter?: SpacingTypes;
}

const Stack = styled.div<StackProps>`
  box-sizing: border-box;
  --gutter: ${({ gutter, theme: { spacing = {} } }) => {
    const spacingMap = { ...defaultSpacings, ...spacing };
    return gutter && spacingMap[gutter] ? spacingMap[gutter] : spacingMap.md;
  }};

  display: grid;
  grid-auto-columns: 100%;
  grid-gap: var(--gutter);

  @supports not (grid-gap: var(--gutter)) {
    display: flex;
    flex-flow: column;

    & > * + * {
      margin-top: var(--gutter);
    }
  }
`;

Stack.displayName = 'Stack';

Stack.propTypes = {
  gutter: PropTypes.oneOf(Object.keys(defaultSpacings) as SpacingTypes[]),
};

export default Stack;

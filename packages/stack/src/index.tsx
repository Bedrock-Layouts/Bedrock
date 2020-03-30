import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  spacing as defaultSpacings,
  SpacingTypes,
  mergeSpacings,
} from '@bedrock-layout/spacing-constants';

export interface StackProps {
  gutter?: SpacingTypes;
}

const Stack = styled.div<StackProps>`
  box-sizing: border-box;
  --gutter:  ${({ gutter, theme: { spacing = {} } }) =>
    gutter && mergeSpacings(spacing)[gutter]
      ? mergeSpacings(spacing)[gutter]
      : mergeSpacings(spacing).md};

  display: grid;
  grid-auto-columns: 100%;
  grid-gap: var(--gutter);

  @supports not (grid-gap: var(--gutter)) {
    display: flex;
    flex-flow: column;

    & > * + * {
      margin-top:  ${({ gutter, theme: { spacing = {} } }) =>
        gutter && mergeSpacings(spacing)[gutter]
          ? mergeSpacings(spacing)[gutter]
          : mergeSpacings(spacing).md};
      }};
    }
  }
`;

Stack.displayName = 'Stack';

Stack.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
};

Stack.defaultProps = {
  gutter: 'md',
};

export default Stack;

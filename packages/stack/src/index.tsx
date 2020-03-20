import styled from 'styled-components';
import {
  spacing as spacingMap,
  SpacingTypes,
} from '@bedrock-layout/spacing-constants';

export interface StackProps {
  gutter?: SpacingTypes;
}

export default styled.div<StackProps>`
  display: grid;
  grid-auto-columns: 100%;
  grid-gap: ${({ gutter, theme: { spacing = spacingMap } }) =>
    gutter ? spacing[gutter] : spacing.md};
`;

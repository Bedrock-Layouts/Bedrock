import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  spacing as defaultSpacings,
  SpacingTypes,
  Spacing,
} from '@bedrock-layout/spacing-constants';

type MergeSpacings = (spacing: object) => Spacing;
const mergeSpacings: MergeSpacings = (spacing = {}) => ({
  ...defaultSpacings,
  ...spacing,
});

export interface ColumnsProps {
  gutter?: SpacingTypes;
  columns?: number;
  dense?: boolean;
}

const Columns = styled.div<ColumnsProps>`
  box-sizing: border-box;

  --gutter: ${({ gutter, theme: { spacing = {} } }) =>
    gutter && mergeSpacings(spacing)[gutter]
      ? mergeSpacings(spacing)[gutter]
      : mergeSpacings(spacing).md};
  --columns: ${({ columns = 1 }) => (columns > 0 ? columns : 1)};

  display: grid;
  grid-template-columns: repeat(var(--gutter), 1fr);
  grid-gap: var(--gutter);
  grid-auto-flow: row ${props => props.dense && 'dense'};

  @supports not (grid-gap: var(--gutter)) {
    display: flex;
    flex-flow: column;

    > * + * {
      margin-top: ${({ gutter, theme: { spacing = {} } }) =>
        gutter && mergeSpacings(spacing)[gutter]
          ? mergeSpacings(spacing)[gutter]
          : mergeSpacings(spacing).md};
    }
  }
`;

Columns.displayName = 'Columns';

Columns.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
  columns: PropTypes.number,
  dense: PropTypes.bool,
};

Columns.defaultProps = {
  gutter: 'md',
  columns: 1,
  dense: false,
};

export interface ColumnProps {
  span?: number;
}
export const Column = styled.div<ColumnProps>`
  grid-column: span ${({ span = 1 }) => (span > 0 ? span : 1)};
`;

Column.propTypes = {
  span: PropTypes.number,
};

Column.defaultProps = {
  span: 1,
};

export default Columns;

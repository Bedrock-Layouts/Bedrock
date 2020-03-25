import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  spacing as defaultSpacings,
  SpacingTypes,
} from '@bedrock-layout/spacing-constants';

export interface GridProps {
  gutter?: SpacingTypes;
  minItemWidth?: number;
}

const Grid = styled.div<GridProps>`
  box-sizing: border-box;

  --gutter: ${({ gutter, theme: { spacing = {} } }) => {
    const spacingMap = { ...defaultSpacings, ...spacing };
    return gutter && spacingMap[gutter] ? spacingMap[gutter] : spacingMap.md;
  }};

--minItemWidth:${props =>
  typeof props.minItemWidth === 'number' ? props.minItemWidth : 1}px;

  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(var(--minItemWidth), 1fr)
  );
  grid-gap: var(--gutter);

  @supports (width: min(${props => props.minItemWidth}px, 100%)) {
    grid-template-columns: repeat(auto-fit, minmax(min(var(--minItemWidth), 100%), 1fr));
  }

  @supports not (grid-gap: var(--gutter)) {
    /* display: flex;
    flex-flow: column;

    & > * + * {
      margin-top: var(--gutter);
    }
  } */
`;

Grid.displayName = 'Grid';

Grid.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
  minItemWidth: PropTypes.number,
};

Grid.defaultProps = {
  gutter: 'md',
  minItemWidth: 1,
};

export default Grid;

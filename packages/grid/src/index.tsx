import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  spacing as defaultSpacings,
  SpacingTypes,
  mergeSpacings,
  mergeBreakpoints,
} from '@bedrock-layout/spacing-constants';

export interface GridProps {
  gutter?: SpacingTypes;
  minItemWidth?: number;
}

const Grid = styled.div<GridProps>`
  box-sizing: border-box;

  --gutter: ${({ gutter, theme: { spacing = {} } }) =>
    gutter && mergeSpacings(spacing)[gutter]
      ? mergeSpacings(spacing)[gutter]
      : mergeSpacings(spacing).md};

  --minItemWidth: ${props =>
    typeof props.minItemWidth === 'number'
      ? `${props.minItemWidth}px`
      : mergeBreakpoints(props.theme.breakPoints).smallOnly + 'px'};

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--minItemWidth), 1fr));
  grid-gap: var(--gutter);

  @supports (width: min(var(--minItemWidth), 100%)) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(var(--minItemWidth), 100%), 1fr)
    );
  }

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

Grid.displayName = 'Grid';

Grid.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
  minItemWidth: PropTypes.number,
};

Grid.defaultProps = {
  gutter: 'md',
};

export default Grid;

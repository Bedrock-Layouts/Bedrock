import {
  SpacingTypes,
  spacing as defaultSpacings,
  mergeBreakpoints,
  mergeSpacings,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

export interface GridProps {
  gutter?: SpacingTypes;
  minItemWidth?: number;
}

const Grid = styled.div<GridProps>`
  box-sizing: border-box;

  --gutter: ${({ gutter, theme: { spacing = {} } }) =>
    gutter && mergeSpacings(spacing)[gutter]
      ? mergeSpacings(spacing)[gutter]
      : mergeSpacings(spacing).lg};

  --minItemWidth: ${(props) =>
    typeof props.minItemWidth === "number"
      ? `${props.minItemWidth}px`
      : mergeBreakpoints(props.theme.breakPoints).smallOnly + "px"};

  display: grid;
  gap: var(--gutter);

  grid-template-columns: repeat(
    auto-fit,
    minmax(min(var(--minItemWidth), 100%), 1fr)
  );
`;

Grid.displayName = "Grid";

Grid.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
  minItemWidth: PropTypes.number,
};

Grid.defaultProps = {
  gutter: "lg",
};

export default Grid;

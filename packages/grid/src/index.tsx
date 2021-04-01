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
  minItemWidth?: number | string;
}

const CSS =
  globalThis.CSS !== undefined
    ? globalThis.CSS
    : {
        supports: () => false,
      };

function getSafeMinItemWidth(
  breakPoints: Record<string, unknown>,
  minItemWidth?: number | string
) {
  if (
    typeof minItemWidth === "string" &&
    CSS.supports(`width:${minItemWidth}`)
  ) {
    return minItemWidth;
  }

  return typeof minItemWidth === "number"
    ? `${minItemWidth}px`
    : mergeBreakpoints(breakPoints).smallOnly + "px";
}

const Grid = styled.div.attrs<GridProps>(
  ({
    minItemWidth,
    gutter = "lg",
    theme: { spacing = {}, breakPoints = {} },
    style,
  }) => {
    const safeGutter =
      gutter && mergeSpacings(spacing)[gutter]
        ? mergeSpacings(spacing)[gutter]
        : mergeSpacings(spacing).lg;

    const safeMinItemWidth = getSafeMinItemWidth(breakPoints, minItemWidth);

    return {
      "data-bedrock-layout-grid": "",
      style: {
        ...style,
        "--gutter": safeGutter,
        "--minItemWidth": safeMinItemWidth,
      },
    };
  }
)<GridProps>`
  box-sizing: border-box;

  --gutter: 1rem;
  --minItemWidth: 639px;

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
  minItemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Grid;

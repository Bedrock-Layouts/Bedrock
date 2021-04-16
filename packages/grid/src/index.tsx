import {
  SpacingOptions,
  getSpacingValue,
  mergeBreakpoints,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

export interface GridProps {
  gutter: keyof SpacingOptions;
  minItemWidth?: number | string;
}

function getSafeMinItemWidth(
  breakPoints: Record<string, unknown>,
  minItemWidth?: number | string
) {
  if (typeof minItemWidth === "string") {
    return minItemWidth;
  }

  return typeof minItemWidth === "number"
    ? `${minItemWidth}px`
    : mergeBreakpoints(breakPoints).smallOnly + "px";
}

export const Grid = styled.div.attrs<GridProps>(() => {
  return {
    "data-bedrock-layout-grid": "",
  };
})<GridProps>`
  box-sizing: border-box;
  @property --minItemWidth {
    syntax: "<length>";
    inherits: false;
    initial-value: 639px;
  }

  --gutter: ${({ gutter, theme }) => getSpacingValue(theme, gutter) ?? "0px"};
  --minItemWidth: ${({ minItemWidth, theme }) =>
    getSafeMinItemWidth(theme.breakPoints ?? {}, minItemWidth)};

  display: grid;
  gap: var(--gutter);

  grid-template-columns: repeat(auto-fit, minmax(min(639, 100%), 1fr));

  @supports (
    width:
      ${({ minItemWidth, theme }) =>
        getSafeMinItemWidth(theme.breakPoints ?? {}, minItemWidth)}
  ) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(var(--minItemWidth), 100%), 1fr)
    );
  }
`;

Grid.displayName = "Grid";

Grid.propTypes = {
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
  minItemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

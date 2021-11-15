import {
  SizesOptions,
  SpacingOptions,
  getSizeValue,
  getSpacingValue,
  sizes,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

type MinItemWidth = number | string | SizesOptions;
export interface GridProps {
  gutter: keyof SpacingOptions;
  minItemWidth?: MinItemWidth;
}

function getSafeMinItemWidth(minItemWidth?: MinItemWidth) {
  if (typeof minItemWidth === "string") {
    return minItemWidth;
  }

  return typeof minItemWidth === "number" ? `${minItemWidth}px` : sizes.small;
}

export const Grid = styled.div.attrs<GridProps>(() => {
  return {
    "data-bedrock-grid": "",
  };
})<GridProps>`
  box-sizing: border-box;
  > * {
    margin: 0;
  }

  @property --minItemWidth {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: ${sizes.small};
  }

  --gutter: ${({ gutter, theme }) => getSpacingValue(theme, gutter) ?? "0px"};
  --minItemWidth: ${({ minItemWidth, theme }) =>
    getSafeMinItemWidth(getSizeValue(theme, minItemWidth) ?? minItemWidth)};

  display: grid;
  gap: var(--gutter);

  grid-template-columns: repeat(
    auto-fit,
    minmax(min(${sizes.small}, 100%), 1fr)
  );

  @supports (
    width:
      ${({ minItemWidth, theme }) =>
        getSafeMinItemWidth(getSizeValue(theme, minItemWidth) ?? minItemWidth)}
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

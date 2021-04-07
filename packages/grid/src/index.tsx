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

//Logic forked from is-in-browser npm package
const isBrowser =
  typeof window === "object" &&
  typeof document === "object" &&
  document.nodeType === 9;

const CSS = isBrowser
  ? window.CSS
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

export const Grid = styled.div.attrs<GridProps>(
  ({ minItemWidth, gutter = "lg", theme, style }) => {
    const maybeGutter = getSpacingValue(theme, gutter);

    const safeMinItemWidth = getSafeMinItemWidth(
      theme.breakPoints ?? {},
      minItemWidth
    );

    return {
      "data-bedrock-layout-grid": "",
      style: {
        ...style,
        "--gutter": maybeGutter ?? "0px",
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
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
  minItemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

import {
  SpacingTypes,
  spacing as defaultSpacings,
  mergeSpacings,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

export interface ColumnsProps {
  gutter?: SpacingTypes;
  columns?: number;
  dense?: boolean;
}

export const Columns = styled.div<ColumnsProps>`
  box-sizing: border-box;

  --gutter: ${({ gutter = "lg", theme: { spacing = {} } }) =>
    gutter && mergeSpacings(spacing)[gutter]
      ? mergeSpacings(spacing)[gutter]
      : mergeSpacings(spacing).lg};

  --columns: ${({ columns = 1 }) => (columns > 0 ? columns : 1)};

  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gutter);
  grid-auto-flow: row ${({ dense = false }) => (dense === true ? "dense" : "")};
`;

Columns.displayName = "Columns";

Columns.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
  columns: PropTypes.number,
  dense: PropTypes.bool,
};

export interface ColumnProps {
  span?: number;
}

type SafeSpan = (span: unknown) => number;
const safeSpan: SafeSpan = (span) => {
  return typeof span === "number" ? span : 1;
};

export const Column = styled.div.attrs((props) => ({
  /* eslint-disable */
  ["data-bedrock-layout-column"]: "",
}))<ColumnProps>`
  grid-column: span ${({ span = 1 }) => Math.max(safeSpan(span), 1)} / auto;
`;

Column.propTypes = {
  span: PropTypes.number,
};

Column.defaultProps = {
  span: 1,
};

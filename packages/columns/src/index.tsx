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

export const Columns = styled.div.attrs<ColumnsProps>(
  ({ columns = 1, gutter = "lg", theme: { spacing = {} }, style }) => {
    const safeGutter =
      gutter && mergeSpacings(spacing)[gutter]
        ? mergeSpacings(spacing)[gutter]
        : mergeSpacings(spacing).lg;
    return {
      "data-bedrock-layout-columns": "",
      style: {
        ...style,
        "--columns": columns > 0 ? columns : 1,
        "--gutter": safeGutter,
      },
    };
  }
)<ColumnsProps>`
  box-sizing: border-box;
  --gutter: 1rem;
  --columns: 1;

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

//ColumnsProps passed twice to make propTypes work
export const Column = styled.div.attrs<ColumnProps>((props) => {
  const { span, style } = props;

  return {
    "data-bedrock-layout-column": "",
    span: undefined,
    style: {
      ...style,
      "--span": Math.max(safeSpan(span), 1),
    },
  };
})<ColumnProps>`
  --span: 1;
  grid-column: span min(var(--span), var(--columns)) / auto;
`;

Column.displayName = "Column";

Column.propTypes = {
  span: PropTypes.number,
};

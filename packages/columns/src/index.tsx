import styled from "styled-components";
import PropTypes from "prop-types";
import {
  spacing as defaultSpacings,
  SpacingTypes,
  mergeSpacings,
} from "@bedrock-layout/spacing-constants";

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
      : mergeSpacings(spacing).lg};
  --columns: ${({ columns = 1 }) => (columns > 0 ? columns : 1)};

  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-gap: var(--gutter);
  grid-auto-flow: row ${(props) => props.dense === true && "dense"};

  @supports not (grid-gap: var(--gutter)) {
    display: flex;
    flex-flow: column;

    > * + * {
      margin-top: ${({ gutter, theme: { spacing = {} } }) =>
        gutter && mergeSpacings(spacing)[gutter]
          ? mergeSpacings(spacing)[gutter]
          : mergeSpacings(spacing).lg};
    }
  }
`;

Columns.displayName = "Columns";

Columns.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
  columns: PropTypes.number,
  dense: PropTypes.bool,
};

Columns.defaultProps = {
  gutter: "lg",
  columns: 1,
  dense: false,
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

if (typeof exports !== "undefined") {
  Object.defineProperty(exports, "__esModule", {
    value: true,
  });
}
export default Columns;

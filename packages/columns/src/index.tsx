import {
  SpacingOptions,
  getSpacingValue,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

export interface ColumnsProps {
  gutter: keyof SpacingOptions;
  columns?: number;
  dense?: boolean;
}

export const Columns = styled.div.attrs<ColumnsProps>(() => ({
  "data-bedrock-layout-columns": "",
}))<ColumnsProps>`
  box-sizing: border-box;
  --gutter: ${({ gutter, theme }) => {
    const maybeGutter = getSpacingValue(theme, gutter);
    return maybeGutter ?? "0px";
  }};

  --columns: ${({ columns = 1 }) => {
    return columns > 0 ? columns : 1;
  }};

  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gutter);
  grid-auto-flow: row ${({ dense = false }) => (dense === true ? "dense" : "")};
`;

Columns.displayName = "Columns";

Columns.propTypes = {
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
  columns: PropTypes.number,
  dense: PropTypes.bool,
};

export interface ColumnProps {
  span?: number;
}

const safeSpan = (span: unknown) => {
  return typeof span === "number" ? span : 1;
};

/**
 * ColumnsProps passed twice to make propTypes work.
 *
 * span is remaped to colSpan due to span being an attribute that gets
 * passed to the underlying element.  This can cause issues with Grid layout.
 *
 * In a future breaking change, colSpan should be the public API.
 * */
export const Column = styled.div.attrs<ColumnProps, { colSpan?: number }>(
  (props) => {
    const { span } = props;

    return {
      "data-bedrock-layout-column": "",
      span: undefined,
      colSpan: span,
    };
  }
)<ColumnProps>`
  --span: ${(props) => Math.max(safeSpan(props.colSpan), 1)};

  grid-column: span min(var(--span), var(--columns)) / auto;
`;

Column.displayName = "Column";

Column.propTypes = {
  span: PropTypes.number,
};

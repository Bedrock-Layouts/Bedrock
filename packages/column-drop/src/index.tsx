import {
  SizesOptions,
  SpacingOptions,
  getSizeValue,
  getSpacingValue,
  sizes,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

type Basis = string | number | SizesOptions;

export interface ColumnDropProps {
  gutter: keyof SpacingOptions;
  basis?: Basis;
  noStretchedColumns?: boolean;
}

export const ColumnDrop = styled.div.attrs<ColumnDropProps>(
  ({ gutter, theme, style = {}, basis, noStretchedColumns = false }) => {
    const maybeGutter = getSpacingValue(theme, gutter);
    const gutterValue = maybeGutter ?? "0px";

    const attributeValue =
      noStretchedColumns === true ? "no-stretched-columns" : "";

    const safeBasis = getSizeValue(theme, basis) ?? basis ?? sizes.xxsmall;

    return {
      "data-bedrock-column-drop": attributeValue,
      style: { ...style, "--gutter": gutterValue, "--basis": safeBasis },
    };
  }
)<ColumnDropProps>`
  @property --basis {
    syntax: "<length-percentage>";
    inherits: true;
    initial-value: ${sizes.xxsmall};
  }

  @property --gutter {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: 0px;
  }

  box-sizing: border-box;
  > * {
    margin: 0;
    flex-basis: var(--basis, ${sizes.xxsmall});
    flex-grow: ${(props) => (props.noStretchedColumns ? "0" : "1")};
    flex-shrink: 1;
  }

  display: flex;
  flex-wrap: wrap;
  gap: var(--gutter);
`;

ColumnDrop.displayName = "ColumnDrop";

ColumnDrop.propTypes = {
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
  basis: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  noStretchedColumns: PropTypes.bool,
};

import {
  CSSLength,
  SizesOptions,
  SpacingOptions,
  checkIsCSSLength,
  getSizeValue,
  getSpacingValue,
  sizes,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

type Basis = CSSLength | number | SizesOptions;

export interface ColumnDropProps {
  gutter: keyof SpacingOptions;
  basis?: Basis;
  noStretchedColumns?: boolean;
}

function getSafeBasis<T extends Record<string, unknown>>(
  theme: T,
  basis?: Basis
) {
  if (typeof basis === "number") return `${basis}px`;
  if (checkIsCSSLength(basis as string)) return basis;
  return getSizeValue(theme, basis as string);
}

export const ColumnDrop = styled.div.attrs<ColumnDropProps>(
  ({ gutter, theme, style = {}, basis, noStretchedColumns = false }) => {
    const maybeGutter = getSpacingValue(theme, gutter);

    const attributeValue =
      noStretchedColumns === true ? "no-stretched-columns" : "";

    const safeBasis = getSafeBasis(theme, basis);

    return {
      "data-bedrock-column-drop": attributeValue,
      style: { ...style, "--gutter": maybeGutter, "--basis": safeBasis },
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
  gap: var(--gutter, 0px);
`;

ColumnDrop.displayName = "ColumnDrop";

function validateBasis({ basis }: ColumnDropProps, propName: string) {
  if (basis === undefined) return;

  const isValid =
    typeof basis === "number" ||
    checkIsCSSLength(basis as string) ||
    Object.keys(sizes).includes(basis as string);

  if (!isValid) {
    console.error(
      `${propName} needs to be an number, CSSLength or SizesOptions`
    );
  }
  return;
}

ColumnDrop.propTypes = {
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
  basis: validateBasis as unknown as React.Validator<Basis>,
  noStretchedColumns: PropTypes.bool,
};

import {
  CSSLength,
  Gutter,
  SizesOptions,
  checkIsCSSLength,
  getSafeGutter,
  getSizeValue,
  sizes,
  validateGutter,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

type MinItemWidth = CSSLength | number | SizesOptions;

export interface ColumnDropProps {
  gutter?: Gutter;
  minItemWidth?: MinItemWidth;
  noStretchedColumns?: boolean;
}

function getSafeMinItemWidth<T extends Record<string, unknown>>(
  theme: T,
  minItemWidth?: MinItemWidth
) {
  if (typeof minItemWidth === "number") return `${minItemWidth}px`;
  if (checkIsCSSLength(minItemWidth as string)) return minItemWidth;
  return getSizeValue(theme, minItemWidth as string);
}

export const ColumnDrop = styled.div.attrs<ColumnDropProps>(
  ({ gutter, theme, style = {}, minItemWidth, noStretchedColumns = false }) => {
    const maybeGutter = getSafeGutter(theme, gutter);

    const attributeValue =
      noStretchedColumns === true ? "no-stretched-columns" : "";

    const safeMinItemWidth = getSafeMinItemWidth(theme, minItemWidth);

    return {
      "data-bedrock-column-drop": attributeValue,
      style: {
        ...style,
        "--gutter": maybeGutter,
        "--minItemWidth":
          typeof safeMinItemWidth === "number"
            ? `${safeMinItemWidth}px`
            : safeMinItemWidth,
      },
    };
  }
)<ColumnDropProps>`
  @property --gutter {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: 0px;
  }

  box-sizing: border-box;
  > * {
    margin: 0;
    flex-basis: var(--minItemWidth, ${sizes.xxsmall});
    flex-grow: ${(props) => (props.noStretchedColumns ? "0" : "1")};
    flex-shrink: 1;
  }

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--gutter, 0px);
`;

ColumnDrop.displayName = "ColumnDrop";

function validateMinItemWidth(
  { minItemWidth }: ColumnDropProps,
  propName: string
) {
  if (minItemWidth === undefined) return;

  const isValid =
    typeof minItemWidth === "number" ||
    checkIsCSSLength(minItemWidth as string) ||
    Object.keys(sizes).includes(minItemWidth as string);

  if (isValid) return;

  console.error(`${propName} needs to be a number, CSSLength or SizesOptions`);
}

ColumnDrop.propTypes = {
  gutter: validateGutter,
  minItemWidth:
    validateMinItemWidth as unknown as React.Validator<MinItemWidth>,
  noStretchedColumns: PropTypes.bool,
};

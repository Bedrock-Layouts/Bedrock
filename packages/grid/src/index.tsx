import {
  CSSLength,
  Gutter,
  SizesOptions,
  SpacingOptions,
  checkIsCSSLength,
  getSafeGutter,
  getSizeValue,
  sizes,
  validateGutter,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

type MinItemWidth = number | CSSLength | SizesOptions;
export interface GridProps {
  gutter?: Gutter;
  minItemWidth?: MinItemWidth;
}

export const Grid = styled.div.attrs<GridProps>(
  ({ style, theme, minItemWidth, gutter }) => {
    const safeMinItemWidth = getSizeValue(theme, minItemWidth) ?? minItemWidth;

    const safeGutter = getSafeGutter(theme, gutter);
    return {
      "data-bedrock-grid": "",
      style: {
        ...style,
        "--gutter": safeGutter,
        "--minItemWidth": safeMinItemWidth,
      },
    };
  }
)<GridProps>`
  @property --gutter {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: 0;
  }

  @property --minItemWidth {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: ${sizes.small};
  }

  box-sizing: border-box;
  > * {
    margin: 0;
  }

  display: grid;
  gap: var(--gutter, 0px);

  grid-template-columns: repeat(
    auto-fit,
    minmax(min(var(--minItemWidth, ${sizes.small}), 100%), 1fr)
  );
`;

Grid.displayName = "Grid";

function validateMinItemWidth({ minItemWidth }: GridProps, propName: string) {
  if (minItemWidth === undefined) return undefined;

  const isValid =
    typeof minItemWidth === "number" ||
    checkIsCSSLength(minItemWidth as string) ||
    Object.keys(sizes).includes(minItemWidth as string);

  if (!isValid) {
    console.error(
      `${propName} needs to be an number, CSSLength or SizesOptions`
    );
  }
  return undefined;
}

Grid.propTypes = {
  gutter: validateGutter,
  minItemWidth:
    validateMinItemWidth as unknown as PropTypes.Requireable<MinItemWidth>,
};

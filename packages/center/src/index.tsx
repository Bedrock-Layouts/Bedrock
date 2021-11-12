import {
  SizesOptions,
  getSizeValue,
  sizes,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

type MaxWidth = number | string | SizesOptions;

export interface CenterProps {
  maxWidth?: MaxWidth;
  centerText?: boolean;
  centerChildren?: boolean;
}

function getSafeMaxWidth(maxWidth?: MaxWidth) {
  if (typeof maxWidth === "string") {
    return maxWidth;
  }

  return typeof maxWidth === "number" ? `${maxWidth}px` : sizes.medium;
}

export const Center = styled.div.attrs<CenterProps>(
  ({ centerChildren, centerText }) => {
    const centerProps = [
      centerText && "center-text",
      centerChildren && "center-children",
    ]
      .filter((x) => x)
      .join(" ");

    return {
      "data-bedrock-layout-center": centerProps,
    };
  }
)<CenterProps>`
  @property --maxWidth {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: ${sizes.medium};
  }
  --maxWidth: ${({ maxWidth, theme }) =>
    getSafeMaxWidth(getSizeValue(theme, maxWidth) ?? maxWidth)};

  box-sizing: content-box;

  margin-inline-start: auto;
  margin-inline-end: auto;
  margin-inline: auto;

  max-inline-size: ${sizes.medium};

  @supports (
    max-inline-size:
      ${({ maxWidth, theme }) =>
        getSafeMaxWidth(getSizeValue(theme, maxWidth) ?? maxWidth)}
  ) {
    max-inline-size: var(--maxWidth, ${sizes.medium});
  }

  ${(props) =>
    props.centerChildren &&
    `display: flex;
    flex-direction: column;
    align-items: center;`}

  ${(props) => props.centerText && `text-align: center;`}
`;

Center.displayName = "Center";

Center.propTypes = {
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  centerText: PropTypes.bool,
  centerChildren: PropTypes.bool,
};

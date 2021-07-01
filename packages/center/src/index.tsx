import { sizes } from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

export interface CenterProps {
  maxWidth?: number | string;
  centerText?: boolean;
  centerChildren?: boolean;
}

function getSafeMaxWidth(maxWidth?: number | string) {
  if (typeof maxWidth === "string") {
    return maxWidth;
  }

  return typeof maxWidth === "number" ? `${maxWidth}px` : sizes.medium;
}

export const Center = styled.div.attrs<CenterProps>(() => {
  return {
    "data-bedrock-layout-center": "",
  };
})<CenterProps>`
  @property --maxWidth {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: ${sizes.medium};
  }
  --maxWidth: ${({ maxWidth }) => getSafeMaxWidth(maxWidth)};

  box-sizing: content-box;

  margin-inline-start: auto;
  margin-inline-end: auto;
  margin-inline: auto;

  max-inline-size: ${sizes.medium};

  @supports (max-inline-size: ${({ maxWidth }) => getSafeMaxWidth(maxWidth)}) {
    max-inline-size: var(--maxWidth, ${sizes.medium});
  }

  ${(props) => (props.centerText ? "text-align: center;" : "")}

  ${(props) =>
    props.centerChildren
      ? `
  display: flex;
  flex-direction: column;
  align-items: center;
  `
      : ""}
`;

Center.displayName = "Center";

Center.propTypes = {
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  centerText: PropTypes.bool,
  centerChildren: PropTypes.bool,
};

import PropTypes from "prop-types";
import styled from "styled-components";

const MEDIUM_BREAKPOINT = "1023px";
export interface CenterProps {
  maxWidth?: number | string;
  centerText?: boolean;
  centerChildren?: boolean;
}

function getSafeMaxWidth(maxWidth?: number | string) {
  if (typeof maxWidth === "string") {
    return maxWidth;
  }

  return typeof maxWidth === "number" ? `${maxWidth}px` : MEDIUM_BREAKPOINT;
}

export const Center = styled.div.attrs<CenterProps>(() => {
  return {
    "data-bedrock-layout-center": "",
  };
})<CenterProps>`
  @property --maxWidth {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: ${MEDIUM_BREAKPOINT};
  }
  --maxWidth: ${({ maxWidth }) => getSafeMaxWidth(maxWidth)};

  box-sizing: content-box;

  margin-inline-start: auto;
  margin-inline-end: auto;
  margin-inline: auto;

  max-inline-size: ${MEDIUM_BREAKPOINT};

  @supports (max-inline-size: ${({ maxWidth }) => getSafeMaxWidth(maxWidth)}) {
    max-inline-size: var(--maxWidth, ${MEDIUM_BREAKPOINT});
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

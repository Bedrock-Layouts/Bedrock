import { mergeBreakpoints } from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

export interface CenterProps {
  maxWidth?: number | string;
  centerText?: boolean;
  centerChildren?: boolean;
}

function getSafeMaxWidth(breakPoints: object, maxWidth?: number | string) {
  if (
    typeof maxWidth === "string" &&
    typeof CSS !== undefined &&
    CSS.supports(`width:${maxWidth}`)
  ) {
    return maxWidth;
  }

  return typeof maxWidth === "number"
    ? `${maxWidth}px`
    : mergeBreakpoints(breakPoints).medium + "px";
}

const Center = styled.div.attrs<CenterProps>(
  ({ maxWidth, theme: { breakPoints } }) => {
    const safeMaxWidth = getSafeMaxWidth(breakPoints, maxWidth);
    return {
      style: {
        "--maxWidth": safeMaxWidth,
      },
    };
  }
)<CenterProps>`
  --maxWidth: 1023px;

  box-sizing: content-box;

  margin-inline-start: auto;
  margin-inline-end: auto;
  margin-inline: auto;

  max-inline-size: var(--maxWidth);

  ${(props) => (props.centerText ? "text-align:center;" : "")}

  ${(props) =>
    props.centerChildren
      ? `
  display:flex;
  flex-direction: column;
  align-items: center;
  `
      : ""}
`;

Center.displayName = "Center";

Center.propTypes = {
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  centerText: PropTypes.bool,
};

export default Center;

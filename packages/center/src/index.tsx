import { mergeBreakpoints } from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

export interface CenterProps {
  maxWidth?: number;
  centerText?: boolean;
  centerChildren?: boolean;
}

const Center = styled.div<CenterProps>`
  --maxWidth: ${({ maxWidth, theme: { breakPoints } }) =>
    typeof maxWidth === "number"
      ? `${maxWidth}px`
      : mergeBreakpoints(breakPoints).medium + "px"};

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
  maxWidth: PropTypes.number,
  centerText: PropTypes.bool,
};

export default Center;

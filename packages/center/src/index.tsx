import { mergeBreakpoints } from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

export interface CenterProps {
  maxWidth?: number | string;
  centerText?: boolean;
  centerChildren?: boolean;
}

const CSS =
  globalThis.CSS !== undefined
    ? globalThis.CSS
    : {
        supports: () => false,
      };

function getSafeMaxWidth(
  breakPoints: Record<string, unknown>,
  maxWidth?: number | string
) {
  if (typeof maxWidth === "string" && CSS.supports(`max-width:${maxWidth}`)) {
    return maxWidth;
  }

  return typeof maxWidth === "number"
    ? `${maxWidth}px`
    : mergeBreakpoints(breakPoints).medium + "px";
}

const Center = styled.div.attrs<CenterProps>(
  ({ maxWidth, theme: { breakPoints }, style }) => {
    const safeMaxWidth = getSafeMaxWidth(breakPoints, maxWidth);
    return {
      "data-bedrock-layout-center": "",
      style: {
        ...style,
        "--maxWidth": safeMaxWidth,
      },
    };
  }
)<CenterProps>`
  @property --maxWidth {
    syntax: "<length>";
    inherits: false;
    initial-value: 1023px;
  }
  --maxWidth: 1023px;

  box-sizing: content-box;

  margin-inline-start: auto;
  margin-inline-end: auto;
  margin-inline: auto;

  max-inline-size: 1023px;
  max-inline-size: var(--maxWidth, 1023px);

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
};

export default Center;

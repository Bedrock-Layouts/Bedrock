import {
  Gutter,
  getSafeGutter,
  validateGutter,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

export interface ReelProps {
  snapType?: "none" | "proximity" | "mandatory";
  gutter?: Gutter;
}

export const Reel = styled.div.attrs<ReelProps>((props) => {
  const maybeGutter = getSafeGutter(props.theme, props.gutter);
  return {
    "data-bedrock-reel": props.snapType ? `snapType:${props.snapType}` : "",
    style: { ...props.style, "--gutter": maybeGutter },
  };
})<ReelProps>`
  box-sizing: border-box;
  > * {
    margin: 0;
    scroll-snap-align: start;
  }

  display: flex;
  gap: var(--gutter, 0px);

  overflow-x: auto;

  scroll-snap-type: ${({ snapType = "none" }) => {
    switch (snapType) {
      case "none": {
        return "none";
      }
      case "proximity": {
        return "x proximity";
      }
      case "mandatory": {
        return "x mandatory";
      }
      default: {
        return "none";
      }
    }
  }};
`;

Reel.displayName = "Reel";

Reel.propTypes = {
  snapType: PropTypes.oneOf(["none", "proximity", "mandatory"]),
  gutter: validateGutter,
};

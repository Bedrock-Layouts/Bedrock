import {
  SpacingOptions,
  getSpacingValue,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

export interface ReelProps {
  snapType?: "none" | "proximity" | "mandatory";
  gutter: keyof SpacingOptions;
}

export const Reel = styled.div.attrs<ReelProps>((props) => {
  const maybeGutter = getSpacingValue(props.theme, props.gutter);
  return {
    "data-bedrock-reel": props.snapType ? `snapType:${props.snapType}` : "",
    style: { ...props.style, "--gutter": maybeGutter ?? "0px" },
  };
})<ReelProps>`
  box-sizing: border-box;
  > * {
    margin: 0;
    scroll-snap-align: start;
  }

  display: flex;
  gap: var(--gutter);

  overflow-x: scroll;

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
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
};

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

export const Reel = styled.div.attrs<ReelProps>(() => ({
  "data-bedrock-layout-reel": "",
}))<ReelProps>`
  --gutter: ${({ gutter, theme }) => {
    const maybeGutter = getSpacingValue(theme, gutter);
    return maybeGutter ?? "0px";
  }};
  box-sizing: border-box;
  > * {
    margin: 0;
  }

  display: flex;
  gap: var(--gutter);

  overflow: scroll;

  scroll-snap-type: ${({ snapType = "none" }) => {
    switch (snapType) {
      case "none": {
        return "none";
      }
      case "proximity": {
        return "both proximity";
      }
      case "mandatory": {
        return "both mandatory";
      }
      default: {
        return "none";
      }
    }
  }};

  & > * {
    scroll-snap-align: start;
  }
`;

Reel.displayName = "Reel";

Reel.propTypes = {
  snapType: PropTypes.oneOf(["none", "proximity", "mandatory"]),
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
};

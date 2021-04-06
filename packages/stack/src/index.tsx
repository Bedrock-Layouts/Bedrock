import {
  SpacingOptions,
  getSpacingValue,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

export interface StackProps {
  gutter: keyof SpacingOptions;
}

export const Stack = styled.div.attrs<StackProps>(({ gutter, theme }) => {
  const maybeGutter = getSpacingValue(theme, gutter);
  return {
    "data-bedrock-layout-stack": "",
    style: {
      "--gutter": maybeGutter ?? "0px",
    },
  };
})<StackProps>`
  box-sizing: border-box;

  display: grid;
  grid-auto-columns: 100%;
  grid-gap: var(--gutter);

  & > [data-bedrock-layout-column] {
    grid-column: span 1 / auto;
  }
`;

Stack.displayName = "Stack";

Stack.propTypes = {
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
};

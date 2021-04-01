import {
  SpacingTypes,
  spacing as defaultSpacings,
  mergeSpacings,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

export interface StackProps {
  gutter?: SpacingTypes;
}

const Stack = styled.div.attrs<StackProps>(
  ({ gutter = "lg", theme: { spacing = {} }, style }) => {
    const safeGutter =
      gutter && mergeSpacings(spacing)[gutter]
        ? mergeSpacings(spacing)[gutter]
        : mergeSpacings(spacing).lg;
    return {
      "data-bedrock-layout-stack": "",
      style: {
        ...style,
        "--gutter": safeGutter,
      },
    };
  }
)<StackProps>`
  box-sizing: border-box;
  --gutter: 1rem;

  display: grid;
  grid-auto-columns: 100%;
  grid-gap: var(--gutter);

  & > [data-bedrock-layout-column] {
    grid-column: span 1 / auto;
  }
`;

Stack.displayName = "Stack";

Stack.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
};

export default Stack;

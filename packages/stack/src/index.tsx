import {
  Gutter,
  getSafeGutter,
  validateGutter,
} from "@bedrock-layout/spacing-constants";
import styled from "styled-components";

export interface StackProps {
  gutter?: Gutter;
}

export const Stack = styled.div.attrs<StackProps>(
  ({ gutter, theme, style }) => {
    const maybeGutter = getSafeGutter(theme, gutter);
    return {
      "data-bedrock-stack": "",
      style: { ...style, "--gutter": maybeGutter },
    };
  }
)<StackProps>`
  @property --gutter {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: 0px;
  }
  box-sizing: border-box;
  > * {
    margin: 0;
  }

  display: flex;
  flex-direction: column;
  gap: var(--gutter, 0);

  & > [data-bedrock-column] {
    grid-column: span 1 / auto;
  }
`;

Stack.displayName = "Stack";

Stack.propTypes = {
  gutter: validateGutter,
};

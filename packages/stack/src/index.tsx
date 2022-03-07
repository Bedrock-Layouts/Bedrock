import {
  CSSLength,
  SpacingOptions,
  checkIsCSSLength,
  getSpacingValue,
} from "@bedrock-layout/spacing-constants";
import styled from "styled-components";

type Gutter = CSSLength | number | keyof SpacingOptions;
export interface StackProps {
  gutter?: Gutter;
}

function getSafeGutter<T extends Record<string, unknown>>(
  theme: T,
  gutter?: Gutter
) {
  if (typeof gutter === "number") return `${gutter}px`;
  if (checkIsCSSLength(gutter as string)) return gutter;
  return gutter !== undefined
    ? getSpacingValue(theme, gutter as keyof SpacingOptions)
    : undefined;
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

  display: grid;
  gap: var(--gutter, 0px);
  align-content: start;

  & > [data-bedrock-column] {
    grid-column: span 1 / auto;
  }
`;

Stack.displayName = "Stack";

function validateGutter({ gutter }: StackProps, propName: string) {
  if (gutter === undefined) return;

  const isValid = typeof gutter === "number" || typeof gutter === "string";
  if (isValid) return;

  console.error(`${propName} needs to be a number, CSSLength or SizesOptions`);
}

Stack.propTypes = {
  gutter: validateGutter as unknown as React.Validator<Gutter>,
};

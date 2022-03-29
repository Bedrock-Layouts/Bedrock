import { Stack } from "@bedrock-layout/stack";
import styled from "styled-components";

export const Heading = styled(Stack).attrs(() => ({ as: "h1", gutter: "md" }))`
  margin: 0;
  font-size: var(--font-size-fluid-3);
  font-family: "Roboto", sans-serif;
  text-align: center;
  font-weight: var(--font-weight-4);
  letter-spacing: 0.5ch;
`;

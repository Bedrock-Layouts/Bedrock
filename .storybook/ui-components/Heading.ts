import { Stack } from "@bedrock-layout/stack";
import styled from "styled-components";

export const Heading = styled(Stack).attrs(() => ({ as: "h1", gutter: "md" }))`
  margin: 0;
  font-size: clamp(2rem, 10vw, 4.5rem);
  font-family: "Roboto", sans-serif;
  text-align: center;
  font-weight: 400;
  letter-spacing: 0.5ch;
`;

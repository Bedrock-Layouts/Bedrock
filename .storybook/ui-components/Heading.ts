import styled from "styled-components";

import { Stack } from "../../packages/stack/src";

export const Heading = styled.div.attrs(() => ({
  as: Stack,
  forwardedAs: "h1",
  gutter: "md",
}))`
  margin: 0;
  font-size: var(--font-size-fluid-3);
  font-family: "Roboto", sans-serif;
  text-align: center;
  font-weight: var(--font-weight-4);
  letter-spacing: 0.5ch;
  color: white;
`;

export const SubHeading = styled.span`
  font-size: var(--font-size-fluid-2);
  line-height: var(--font-lineheight-2);
  letter-spacing: 0.5ch;
`;

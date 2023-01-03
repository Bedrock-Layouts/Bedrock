import React from "react";
import styled from "styled-components";

import { Stack } from "../../packages/stack/src";

export const Heading = (props) => (
  <Stack as="h1" {...props} className="main-heading" />
);

export const SubHeading = styled.span`
  font-size: var(--font-size-fluid-2);
  line-height: var(--font-lineheight-2);
  letter-spacing: 0.5ch;
`;

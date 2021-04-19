import { Center } from "@bedrock-layout/center";
import { mergeBreakpoints } from "@bedrock-layout/spacing-constants";
import React from "react";
import styled, { ThemeContext } from "styled-components";

const safeTheme = { breakPoints: {} };

export const AppBoundary = styled.div.attrs((props) => {
  const { breakPoints } = React.useContext(ThemeContext) ?? safeTheme;
  const maxWidth = mergeBreakpoints(breakPoints).xxlarge;
  return {
    "data-bedrock-layout-appboundary": "",
    children: <Center maxWidth={maxWidth}>{props.children}</Center>,
  };
})`
  padding: 0;
  max-width: 100%;
  overflow: hidden;
  height: 100%;
`;

AppBoundary.displayName = "AppBoundary";

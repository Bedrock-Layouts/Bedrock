import { Center } from "@bedrock-layout/center";
import React from "react";
import styled from "styled-components";

const XX_LARGE_BREAKPOINT = 1920;

export const AppBoundary = styled.div.attrs((props) => {
  return {
    "data-bedrock-layout-appboundary": "",
    children: <Center maxWidth={XX_LARGE_BREAKPOINT}>{props.children}</Center>,
  };
})`
  padding: 0;
  max-width: 100%;
  overflow: hidden;
  height: 100%;
`;

AppBoundary.displayName = "AppBoundary";

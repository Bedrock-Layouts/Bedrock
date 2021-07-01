import { Center } from "@bedrock-layout/center";
import { sizes } from "@bedrock-layout/spacing-constants";
import React from "react";
import styled from "styled-components";

export const AppBoundary = styled.div.attrs((props) => {
  return {
    "data-bedrock-layout-appboundary": "",
    children: <Center maxWidth={sizes.xxlarge}>{props.children}</Center>,
  };
})`
  padding: 0;
  max-width: 100%;
  overflow: hidden;
  height: 100%;
`;

AppBoundary.displayName = "AppBoundary";

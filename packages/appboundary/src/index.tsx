import { Center } from "@bedrock-layout/center";
import {
  SizesOptions,
  getSizeValue,
  sizes,
} from "@bedrock-layout/spacing-constants";
import React from "react";
import styled from "styled-components";

export interface AppBoundaryProps {
  boundarySize?: SizesOptions;
}

export const AppBoundary = styled.div.attrs<AppBoundaryProps>((props) => {
  return {
    "data-bedrock-layout-appboundary": "",
    children: (
      <Center
        maxWidth={
          getSizeValue(props.theme, props.boundarySize) ?? sizes.xxlarge
        }
      >
        {props.children}
      </Center>
    ),
  };
})`
  padding: 0;
  max-width: 100%;
  overflow: hidden;
  height: 100%;
`;

AppBoundary.displayName = "AppBoundary";

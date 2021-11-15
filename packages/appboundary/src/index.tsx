import { Center } from "@bedrock-layout/center";
import {
  SizesOptions,
  getSizeValue,
  sizes,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export interface AppBoundaryProps {
  boundarySize?: keyof SizesOptions;
}

export const AppBoundary = styled.div.attrs<AppBoundaryProps>((props) => {
  return {
    "data-bedrock-appboundary": "",
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
})<AppBoundaryProps>`
  padding: 0;
  max-width: 100%;
  overflow: hidden;
  height: 100%;
`;

AppBoundary.displayName = "AppBoundary";

AppBoundary.propTypes = {
  boundarySize: PropTypes.string as React.Validator<keyof SizesOptions>,
};

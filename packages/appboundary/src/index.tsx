import { Center } from "@bedrock-layout/center";
import {
  CSSLength,
  SizesOptions,
  checkIsCSSLength,
  getSizeValue,
  sizes,
} from "@bedrock-layout/spacing-constants";
import React from "react";
import styled from "styled-components";

type BoundarySize = number | CSSLength | SizesOptions;
export interface AppBoundaryProps {
  boundarySize?: BoundarySize;
}

export const AppBoundary = styled.div.attrs<AppBoundaryProps>(
  ({ theme, boundarySize, children }) => {
    const maybeSize: CSSLength | undefined =
      typeof boundarySize === "number" && boundarySize > 0
        ? `${boundarySize}px`
        : getSizeValue(theme, boundarySize) ??
          (boundarySize as CSSLength | undefined);
    return {
      "data-bedrock-appboundary": "",
      children: (
        <Center maxWidth={maybeSize ?? sizes.xxlarge}>{children}</Center>
      ),
    };
  }
)<AppBoundaryProps>`
  padding: 0;
  max-inline-size: 100%;
  overflow: hidden;
  height: 100%;
`;

AppBoundary.displayName = "AppBoundary";

function validateIsboundarySize(
  { boundarySize }: AppBoundaryProps,
  propName: string
) {
  if (boundarySize === undefined) return undefined;

  const isValid =
    typeof boundarySize === "number" ||
    checkIsCSSLength(boundarySize as string) ||
    Object.keys(sizes).includes(boundarySize as string);

  if (!isValid) {
    console.error(
      `${propName} needs to be an number, CSSLength or SizesOptions`
    );
  }
  return undefined;
}

AppBoundary.propTypes = {
  boundarySize:
    validateIsboundarySize as unknown as React.Validator<BoundarySize>,
};

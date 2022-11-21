import { Center } from "@bedrock-layout/center";
import {
  CSSLength,
  SizesOptions,
  getSizeValue,
  sizes,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@bedrock-layout/type-utils";
import React, { ElementType, forwardRef } from "react";

type BoundarySize = number | CSSLength | SizesOptions;
interface AppBoundaryPropsBase {
  boundarySize?: BoundarySize;
}

export type AppBoundaryProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, AppBoundaryPropsBase>;

export const AppBoundary = forwardRef(
  <C extends ElementType = "div">(
    { as, boundarySize, children, style, ...props }: AppBoundaryProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const theme = useTheme();
    const maybeSize = getSizeValue(theme, boundarySize);
    const safeStyle = style ?? {};
    const Component = as ?? "div";
    return (
      <Component
        data-bedrock-appboundary
        ref={ref}
        {...props}
        style={{
          padding: 0,
          maxInlineSize: "100%",
          overflow: "hidden",
          height: "100%",
          ...safeStyle,
        }}
      >
        <Center maxWidth={maybeSize ?? sizes.sizeXxl}>{children}</Center>
      </Component>
    );
  }
);

AppBoundary.displayName = "AppBoundary";

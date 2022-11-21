import {
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@bedrock-layout/type-utils";
import React, { ElementType, forwardRef } from "react";
import { CSSProperties } from "styled-components";

const justifyMap = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
} as const;

const alignMap = {
  ...justifyMap,
  stretch: "stretch",
} as const;

interface InlineClusterPropsBase {
  justify?: keyof typeof justifyMap;
  align?: keyof typeof alignMap;
  gutter?: Gutter;
}

export type InlineClusterProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, InlineClusterPropsBase>;

export const InlineCluster = forwardRef(
  <C extends ElementType = "div">(
    { as, justify, align, style, gutter, ...props }: InlineClusterProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const theme = useTheme();
    const justifyValue = justify ? `justify:${justify}` : undefined;
    const alignValue = align ? `align:${align}` : undefined;

    const attributes = [justifyValue, alignValue].filter((x) => x).join(" ");

    const safeStyle = style ?? {};

    const Component = as ?? "div";

    return (
      <Component
        data-bedrock-inline-cluster={attributes}
        ref={ref}
        style={
          {
            ...safeStyle,
            "--gutter": getSafeGutter(theme, gutter),
          } as CSSProperties
        }
        {...props}
      />
    );
  }
);

InlineCluster.displayName = "InlineCluster";

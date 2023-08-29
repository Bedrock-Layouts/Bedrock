import {
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

/**
 * Props for the InlineCluster component.
 */
export interface InlineClusterProps {
  /**
   * The `justify` prop can be used to specify the inline alignment of the children.
   */
  justify?: "start" | "end" | "center";
  /**
   * The `align` prop can be used to specify the block alignment of the children.
   */
  align?: "start" | "end" | "center" | "stretch";
  /**
   * The `gutter` prop can be used to specify the spacing between the children.
   */
  gutter?: Gutter;
}

/**
 * The `InlineCluster` component is used to display a group of elements
 * in a row. When the group is too large to fit in a single row, the
 * elements will be displayed in a cluster based on the width of the
 * container and the justification of the cluster.
 */
export const InlineCluster = forwardRefWithAs<"div", InlineClusterProps>(
  function InlineCluster({ as, justify, align, style, gutter, ...props }, ref) {
    const theme = useTheme();
    const justifyValue = justify ? `justify:${justify}` : undefined;
    const alignValue = align ? `align:${align}` : undefined;

    const attributes = [justifyValue, alignValue].filter(Boolean).join(" ");

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
  },
);

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
  justify?: "start" | "end" | "center" | "space-between" | "space-around";
  /**
   * The `align` prop can be used to specify the block alignment of the children.
   */
  align?: "start" | "end" | "center" | "stretch";
  /**
   * Sets space between each element.
   * @deprecated Use `gap` instead.
   */
  gutter?: Gutter;
  /**
   * Sets space between each element.
   */
  gap?: Gutter;
}

function createAttributeString(
  prefix: string,
  value: string | number | undefined,
) {
  if (value === undefined) return undefined;

  return `${prefix}:${value}`;
}

/**
 * The `InlineCluster` component is used to display a group of elements
 * in a row. When the group is too large to fit in a single row, the
 * elements will be displayed in a cluster based on the width of the
 * container and the justification of the cluster.
 */
export const InlineCluster = forwardRefWithAs<"div", InlineClusterProps>(
  function InlineCluster(
    {
      as: Component = "div",
      justify,
      align,
      style = {},
      gutter,
      gap,
      ...props
    },
    ref,
  ) {
    const theme = useTheme();
    const justifyValue = createAttributeString("justify", justify);
    const alignValue = createAttributeString("align", align);

    const maybeGutter = getSafeGutter(theme, gap ?? gutter);

    const attributes = [justifyValue, alignValue].filter(Boolean).join(" ");

    return (
      <Component
        data-br-inline-cluster={attributes}
        ref={ref}
        style={
          {
            "--gutter": maybeGutter,
            ...style,
          } as CSSProperties
        }
        {...props}
      />
    );
  },
);

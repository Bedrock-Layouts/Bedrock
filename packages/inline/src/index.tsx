import {
  CSSLength,
  Gutter,
  SizesOptions,
  getSafeGutter,
  getSizeValue,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

type MinItemWidth = number | CSSLength | SizesOptions;
type SwitchAt = number | CSSLength | SizesOptions;

/**
 * The `Stretch` type is used to specify which child should stretch to fill the excess space.
 */
export type Stretch = "all" | "start" | "end" | 0 | 1 | 2 | 3 | 4;

/**
 * Props for the Inline component.
 */
export type InlineProps = {
  /**
   * The `stretch` prop can be used to specify a child component that will stretch to fill the excess space.
   */
  stretch?: Stretch;
  /**
   * The `switchAt` prop can be used to specify a breakpoint at which the items will switch to a column layout.
   */
  switchAt?: SwitchAt;
  /**
   * The `minItemWidth` prop can be used to specify a minimum width for all the children.
   */
  minItemWidth?: MinItemWidth;
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
};

function createAttributeString(
  prefix: string,
  value: string | number | undefined,
) {
  if (value === undefined) return undefined;

  return `${prefix}:${value}`;
}

/**
 * The `Inline` component is designed to create consistent spacing between elements of variable width
 * in the inline direction. Unlike the `InlineCluster` component, the items in the `Inline` component
 * will not wrap.
 *
 * The `Inline` component also allows you to specify one of the children to stretch to fill the
 * excess space. This is done using the `stretch` prop. The `stretch` prop can be set to `all` for all
 * children to stretch, or a number to stretch a specific child. The `stretch` prop can also be set to
 * `start` or `end` to stretch the first or last child respectively.
 */
export const Inline = forwardRefWithAs<"div", InlineProps>(function Inline(
  {
    as: Component = "div",
    justify,
    align,
    gap,
    gutter,
    stretch,
    style = {},
    switchAt,
    minItemWidth,
    ...props
  },
  ref,
) {
  const theme = useTheme();

  const justifyValue = createAttributeString("justify", justify);
  const alignValue = createAttributeString("align", align);
  const stretchValue = createAttributeString("stretch", stretch);

  const maybeMinItemWidth = getSizeValue(theme, minItemWidth) ?? minItemWidth;
  const switchAtValue = getSizeValue(theme, switchAt);

  const attributes = [justifyValue, alignValue, stretchValue]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      ref={ref}
      data-br-inline={attributes}
      style={
        {
          "--gutter": getSafeGutter(theme, gap ?? gutter),
          "--switchAt": switchAtValue,
          "--minItemWidth": maybeMinItemWidth,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
});

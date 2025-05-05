import {
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React from "react";

/**
 * Props for Stack component.
 */
export interface StackProps {
  /**
   * Sets space between each element.
   * @deprecated Use `gap` instead.
   */
  gutter?: Gutter;
  /**
   * Sets space between each element.
   */
  gap?: Gutter;

  /**
   * The `align` prop can be used to specify the inline alignment of the children.
   */
  align?: "start" | "center" | "end" | "stretch";
}

function createAttributeString(
  prefix: string,
  value: string | number | undefined,
) {
  if (value === undefined) return undefined;

  return `${prefix}:${value}`;
}

/**
 * The `Stack` is designed to literally stack items on top of each other while maintaining a consistent gutter between each item.
 */
export const Stack = forwardRefWithAs<"div", StackProps>(function Stack(
  { as: Component = "div", gutter, gap, align, style = {}, ...props },
  ref,
) {
  const theme = useTheme();

  const alignValue = createAttributeString("align", align);

  const maybeGutter = getSafeGutter(theme, gap ?? gutter);

  const attributes = [alignValue].filter(Boolean).join(" ");

  return (
    <Component
      ref={ref}
      data-br-stack={attributes}
      style={{ "--gutter": maybeGutter, ...style } as React.CSSProperties}
      {...props}
    />
  );
});

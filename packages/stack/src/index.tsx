import {
  Gutter,
  createAttributeString,
  getSafeGutter,
  PaddingConfig,
  getPaddingAttributes,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React from "react";

/**
 * Props for Stack component.
 */
export interface StackProps {
  /**
   * Sets space between each element.
   */
  gap?: Gutter;

  /**
   * The `align` prop can be used to specify the inline alignment of the children.
   */
  align?: "start" | "center" | "end" | "stretch";

  /**
   * Sets padding on the component using design system spacing scale.
   */
  padding?: PaddingConfig;
}

/**
 * The `Stack` is designed to literally stack items on top of each other while maintaining a consistent gutter between each item.
 */
export const Stack = forwardRefWithAs<"div", StackProps>(function Stack(
  { as: Component = "div", gap, align, padding, style = {}, ...props },
  ref,
) {
  const alignValue = createAttributeString("align", align);

  const maybeGutter = getSafeGutter(gap);

  const paddingAttrs = getPaddingAttributes(padding);

  const attributes = [alignValue, ...paddingAttrs].filter(Boolean).join(" ");

  return (
    <Component
      ref={ref}
      data-br-stack={attributes}
      style={{ "--gap": maybeGutter, ...style } as React.CSSProperties}
      {...props}
    />
  );
});

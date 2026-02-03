import {
  Gutter,
  createAttributeString,
  getSafeGutter,
  PaddingConfig,
  getPaddingAttributes,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

/**
 * Props for the Reel component.
 */
export type ReelProps = {
  /**
   * Sets the scroll snap type.
   */
  snapType?: "none" | "proximity" | "mandatory";
  /**
   * Sets space between each element.
   */
  gap?: Gutter;
  /**
   * Sets padding on the component using design system spacing scale.
   */
  padding?: PaddingConfig;
};

/**
 * Scrolling is a popular and natural way to interact with
 * web content. The `Reel` component is designed to organize
 * content into scrollable horizontal list with convenient scroll
 * snap points.
 */
export const Reel = forwardRefWithAs<"div", ReelProps>(function Reel(
  { as: Component = "div", snapType, gap, style = {}, padding, ...props },
  ref,
) {
  const maybeGutter = getSafeGutter(gap);

  const paddingAttrs = getPaddingAttributes(padding);

  const attributeString = [
    createAttributeString("snapType", snapType),
    ...paddingAttrs,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      ref={ref}
      data-br-reel={attributeString}
      style={{ "--gap": maybeGutter, ...style } as CSSProperties}
      {...props}
    />
  );
});

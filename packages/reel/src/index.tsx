import {
  Gutter,
  getSafeGutter,
  useTheme,
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
 * Scrolling is a popular and natural way to interact with
 * web content. The `Reel` component is designed to organize
 * content into scrollable horizontal list with convenient scroll
 * snap points.
 */
export const Reel = forwardRefWithAs<"div", ReelProps>(function Reel(
  { as: Component = "div", snapType, gutter, gap, style = {}, ...props },
  ref,
) {
  const theme = useTheme();
  const maybeGutter = getSafeGutter(theme, gap ?? gutter);

  const attributeString = [createAttributeString("snapType", snapType)]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      ref={ref}
      data-br-reel={attributeString}
      style={{ "--gutter": maybeGutter, ...style } as CSSProperties}
      {...props}
    />
  );
});

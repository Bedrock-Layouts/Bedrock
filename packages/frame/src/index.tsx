import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";
type RatioString =
  | `${number}/${number}`
  | `${number} / ${number}`
  | `${number}:${number}`
  | `${number} : ${number}`;

/**
 * The `Ratio` type is used to specify the aspect ratio of the content.
 */
export type Ratio = readonly [number, number] | RatioString;

/**
 * Props for the `Frame` component.
 */
export interface FrameProps {
  /**
   * The `ratio` prop is used to specify the aspect ratio of the content.
   */
  ratio?: Ratio;
  /**
   * The `position` prop is used to specify the position of the content within the frame.
   */
  position?: string;
}

function checkIsRatio(ratio: unknown): ratio is Ratio {
  const isCorrectArray =
    Array.isArray(ratio) && ratio.length === 2 && ratio.every(Number.isFinite);
  return (
    isCorrectArray ||
    (typeof ratio === "string" &&
      /^\d{1,1000} {0,1}(\/|:) {0,1}\d{1,1000}$/.test(ratio))
  );
}

function getRatioString(ratio: Ratio): `${number}/${number}` {
  const ratioArray = typeof ratio === "string" ? ratio.split(/\/|:/) : ratio;
  return ratioArray
    .map((x) => String(x).trim())
    .join("/") as `${number}/${number}`;
}

function getSafeRatio(ratio: unknown): RatioString | undefined {
  const isRatio = checkIsRatio(ratio);

  return isRatio ? getRatioString(ratio) : undefined;
}

/**
 * The `Frame` component is useful for cropping content, typically media, to a desired aspect ratio.
 */
export const Frame = forwardRefWithAs<"div", FrameProps>(function Frame(
  { as, ratio, style, position, ...props },
  ref,
) {
  const safeRatio = getSafeRatio(ratio);
  const safeStyle = style ?? {};

  const Component = as ?? "div";

  return (
    <Component
      data-bedrock-frame
      ref={ref}
      style={
        {
          ...safeStyle,
          "--ratio": safeRatio,
          "--position": position,
        } as CSSProperties
      }
      {...props}
    />
  );
});

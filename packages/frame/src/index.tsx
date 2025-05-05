import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

type Maybe<T> = NonNullable<T> | undefined;

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
export type FrameProps = {
  /**
   * The `ratio` prop is used to specify the aspect ratio of the content.
   */
  ratio?: Ratio;
  /**
   * The `position` prop is used to specify the position of the content within the frame.
   */
  position?: string;
};

type ValidRatioString = `${number}/${number}`;

function getRatioString(ratio: Ratio): ValidRatioString {
  const ratioArray = typeof ratio === "string" ? ratio.split(/\/|:/) : ratio;
  return ratioArray.map((x) => String(x).trim()).join("/") as ValidRatioString;
}

function getSafeRatio(ratio: unknown): Maybe<ValidRatioString> {
  const isCorrectArray =
    Array.isArray(ratio) && ratio.length === 2 && ratio.every(Number.isFinite);

  if (isCorrectArray) {
    return getRatioString(ratio as unknown as Ratio);
  }

  const ratioStringRegex = /^\d{1,1000} {0,1}(\/|:) {0,1}\d{1,1000}$/;

  if (typeof ratio === "string" && ratioStringRegex.test(ratio)) {
    return getRatioString(ratio as Ratio);
  }

  return undefined;
}

/**
 * The `Frame` component is useful for cropping content, typically media, to a desired aspect ratio.
 */
export const Frame = forwardRefWithAs<"div", FrameProps>(function Frame(
  { as: Component = "div", ratio, style = {}, position, ...props },
  ref,
) {
  const maybeRatio = getSafeRatio(ratio);

  return (
    <Component
      data-br-frame
      ref={ref}
      style={
        {
          "--ratio": maybeRatio,
          "--position": position,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
});

import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@bedrock-layout/type-utils";
import React, { CSSProperties, ElementType, forwardRef } from "react";
type RatioString = `${number}/${number}` | `${number} / ${number}`;

type Ratio = [number, number] | RatioString;
interface FramePropsBase {
  ratio?: Ratio;
  position?: string;
}

export type FrameProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, FramePropsBase>;

function checkIsRatio(ratio: unknown): ratio is Ratio {
  const isCorrectArray =
    Array.isArray(ratio) && ratio.length === 2 && ratio.every(Number.isFinite);
  return (
    isCorrectArray ||
    (typeof ratio === "string" &&
      /^\d{1,1000} {0,1}\/ {0,1}\d{1,1000}$/.test(ratio))
  );
}

function getRatioString(ratio: Ratio): RatioString {
  return Array.isArray(ratio) ? (ratio.join("/") as RatioString) : ratio;
}

function getSafeRatio(ratio: unknown): RatioString | undefined {
  const isRatio = checkIsRatio(ratio);

  return isRatio ? getRatioString(ratio) : undefined;
}

export const Frame = forwardRef(
  <C extends ElementType = "div">(
    { as, ratio, style, position, ...props }: FrameProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
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
  }
);

Frame.displayName = "Frame";

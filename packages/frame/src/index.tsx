import PropTypes from "prop-types";
import styled from "styled-components";

type RatioString = `${number}/${number}` | `${number} / ${number}`;

type Ratio = [number, number] | RatioString;
export interface FrameProps {
  ratio?: Ratio;
  position?: string;
}

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

export const Frame = styled.div.attrs<FrameProps>(({ ratio, style }) => {
  const safeRatio = getSafeRatio(ratio);
  return {
    "data-bedrock-frame": "",
    style: { ...style, "--ratio": safeRatio },
  };
})<FrameProps>`
  box-sizing: border-box;
  display: block;
  inline-size: 100%;
  position: relative;
  overflow: hidden;

  &[style*="--ratio"] {
    aspect-ratio: var(--ratio);
  }

  > * {
    position: absolute;

    inset-block-start: 0;
    inset-block-end: 0;
    inset-inline-start: 0;
    inset-inline-end: 0;

    inset-block: 0;
    inset-inline: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  > :is(img, video) {
    inline-size: 100%;
    block-size: 100%;
    size: 100%;

    object-fit: cover;
    object-position: ${(props) =>
      typeof props.position === "string" ? props.position : "50%"};
  }
`;

Frame.displayName = "Frame";

function validateIsArray({ ratio }: FrameProps, propName: string) {
  if (ratio === undefined) return undefined;
  const isRatio = checkIsRatio(ratio);
  if (!isRatio) {
    console.error(
      `${propName} needs to be an array of two numbers or a string in the form of "width/height"`
    );
  }
  return undefined;
}

Frame.propTypes = {
  ratio: validateIsArray as unknown as React.Validator<Ratio>,
  position: PropTypes.string,
};

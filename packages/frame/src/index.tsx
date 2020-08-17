import styled from "styled-components";
import PropTypes from "prop-types";

export interface FrameProps {
  ratio: [number, number];
  position?: string;
}

const Frame = styled.div<FrameProps>`
  --d: ${(props) =>
    props.ratio && props.ratio[0] && Number.isInteger(props.ratio[0])
      ? props.ratio[0]
      : 1};
  --n: ${(props) =>
    props.ratio && props.ratio[1] && Number.isInteger(props.ratio[1])
      ? props.ratio[1]
      : 1};
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding-bottom: calc(var(--n) / var(--d) * 100%);
  position: relative;

  > * {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > img,
  > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: ${(props) =>
      typeof props.position === "string" ? props.position : "50%"};
  }
`;

Frame.displayName = "Frame";

type TwoNumbers = (props: FrameProps, propName: string) => Error | undefined;
const twoNumbers: TwoNumbers = ({ ratio }, propName) => {
  if (typeof ratio === "undefined") return new Error(`${propName} is required`);

  if (
    !Array.isArray(ratio) ||
    ratio.length !== 2 ||
    !ratio.every(Number.isInteger)
  ) {
    console.error(`${propName} needs to be an array of two numbers`);
  }
  return undefined;
};

Frame.propTypes = {
  //It's valid propType but type of Validator<[number, number]> makes no sense
  ratio: (twoNumbers as unknown) as React.Validator<[number, number]>,
  position: PropTypes.string,
};

export default Frame;

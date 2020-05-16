import styled from 'styled-components';
import PropTypes, { Validator } from 'prop-types';

export interface FrameProps {
  ratio: [number, number];
  position?: string;
}

const Frame = styled.div<FrameProps>`
  --n: ${props => (props.ratio ? props.ratio[0] : 1)};
  --d: ${props => (props.ratio ? props.ratio[1] : 1)};
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
    object-position: ${props => props.position || '50%'};
  }
`;

Frame.displayName = 'Frame';

// type TwoNumbers = (props: FrameProps, propName: string) => Error | undefined;
// const twoNumbers: TwoNumbers = (props, propName) => {
//   if (
//     !Array.isArray(props.ratio) ||
//     props.ratio.length !== 2 ||
//     !props.ratio.every(Number.isInteger)
//   ) {
//     return new Error(`${propName} needs to be an array of two numbers`);
//   }
// };

Frame.propTypes = {
  //ratio: twoNumbers,
  position: PropTypes.string,
};

export default Frame;

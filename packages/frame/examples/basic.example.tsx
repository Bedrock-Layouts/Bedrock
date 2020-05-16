import React from 'react';
import Frame from '@bedrock-layout/frame';
import styled from 'styled-components';
import { array } from '@storybook/addon-knobs';

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = 'BorderedBox';

let title = 'Frame';
let name = 'Basic';

function Example() {
  const ratio = array('ratio', [9, 16]);
  return (
    <Frame ratio={ratio}>
      <img src={`https://picsum.photos/500`} alt='cat' />
    </Frame>
  );
}

Example.story = { name };
export const Comp = Example;
export default {
  title,
};

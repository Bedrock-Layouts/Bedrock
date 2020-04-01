import React from 'react';
import useContainerQuery from '@bedrock-layout/use-container-query';
import styled from 'styled-components';

const BorderedBox = styled.div`
  border: 1px solid black;
`;

BorderedBox.displayName = 'BorderedBox';

let title = 'useContainerQuery';
let name = 'Basic';

function Example() {
  const matches = useContainerQuery(320);

  return (
    <BorderedBox>My Bordered Box is {matches ? '<=' : '>'} 320px</BorderedBox>
  );
}

Example.story = { name };
export const Comp = Example;
export default {
  title,
};

import React from 'react';
import useContainerQuery from '@bedrock-layout/use-container-query';
import styled from 'styled-components';

const BorderedBox = styled.div`
  border: 1px solid black;
`;

BorderedBox.displayName = 'BorderedBox';

let title = 'useContainerQuery';
let name = 'Width Range';

function Example() {
  const [node, ref] = React.useState(null);
  const matches = useContainerQuery(node, 320, 640);

  return (
    <BorderedBox style={{ margin: 'auto', width: '50vw' }} ref={ref}>
      My Bordered Box is {!matches && 'not '}between 320px and 640px
    </BorderedBox>
  );
}

Example.story = { name };
export const Comp = Example;
export default {
  title,
};

import React from 'react';
import Cover from '@bedrock-layout/cover';
import styled from 'styled-components';
import { number } from '@storybook/addon-knobs';

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = 'BorderedBox';

let title = 'Cover';
let name = 'Basic';

function Example() {
  const maxWidth = number('maxWidth', 640);
  return (
    <Cover maxWidth={maxWidth}>
      <BorderedBox>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </BorderedBox>
    </Cover>
  );
}

Example.story = { name };
export const Comp = Example;
export default {
  title,
};

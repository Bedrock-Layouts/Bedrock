import React from 'react';
import Cover from '@bedrock-layout/cover';
import styled from 'styled-components';
import { spacing, SpacingTypes } from '@bedrock-layout/spacing-constants';
import { text, select } from '@storybook/addon-knobs';

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = 'BorderedBox';

let title = 'Cover';
let name = 'With Top';

function Example() {
  const minHeight = text('minHeight', '100vh');
  const padding = select('padding', Object.keys(spacing), 'md');
  const gutter = select('gutter', Object.keys(spacing), 'md');
  return (
    <Cover
      minHeight={minHeight}
      padding={padding as SpacingTypes}
      gutter={gutter as SpacingTypes}
      top={<div>I am on Top</div>}
    >
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

import React from 'react';
import { SplitSwitcher } from '@bedrock-layout/switcher';
import {
  spacing,
  breakPoints,
  SpacingTypes,
} from '@bedrock-layout/spacing-constants';
import styled from 'styled-components';
import { select, number } from '@storybook/addon-knobs';

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = 'BorderedBox';

let title = 'Switcher';
let name = 'SplitSwitcher';

function Example() {
  const gutter = select('gutter', Object.keys(spacing), 'lg');
  const fraction = select(
    'fraction',
    ['auto-start', 'auto-end', '1/4', '1/3', '1/2', '2/3', '3/4'],
    '1/2'
  );
  const switchAt = number('switchAt', breakPoints.smallOnly);
  return (
    <SplitSwitcher
      gutter={gutter as SpacingTypes}
      fraction={fraction}
      switchAt={switchAt}
    >
      <BorderedBox>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </BorderedBox>
      <BorderedBox>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </BorderedBox>
      <BorderedBox>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </BorderedBox>
      <BorderedBox>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </BorderedBox>
    </SplitSwitcher>
  );
}

Example.story = { name };
export const Comp = Example;
export default {
  title,
};

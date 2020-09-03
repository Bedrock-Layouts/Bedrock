import {
  SpacingTypes,
  breakPoints,
  spacing,
} from "@bedrock-layout/spacing-constants";
import { SplitSwitcher } from "@bedrock-layout/switcher";
import { number, select } from "@storybook/addon-knobs";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

const title = "Switcher";
const name = "SplitSwitcher";

function Example() {
  const gutter = select("gutter", Object.keys(spacing), "lg");
  const fraction = select(
    "fraction",
    ["auto-start", "auto-end", "1/4", "1/3", "1/2", "2/3", "3/4"],
    "1/2"
  );
  const switchAt = number("switchAt", breakPoints.smallOnly);
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

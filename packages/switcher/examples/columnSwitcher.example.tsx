import { Column } from "@bedrock-layout/columns";
import {
  SpacingTypes,
  breakPoints,
  spacing,
} from "@bedrock-layout/spacing-constants";
import { ColumnsSwitcher } from "@bedrock-layout/switcher";
import { boolean, number, select } from "@storybook/addon-knobs";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

const title = "Switcher";
const name = "ColumnSwitcher";

function Example() {
  const gutter = select("gutter", Object.keys(spacing), "lg");
  const dense = boolean("dense", false);
  const columns = number("columns", 3);
  const switchAt = number("switchAt", breakPoints.smallOnly);
  return (
    <ColumnsSwitcher
      gutter={gutter as SpacingTypes}
      columns={columns}
      switchAt={switchAt}
      dense={dense}
    >
      <>
        <BorderedBox>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          consequuntur corrupti beatae commodi vitae, perspiciatis totam
          provident architecto doloribus aperiam sapiente, incidunt nihil
          suscipit voluptatibus tempore est dolor! Iusto, vero.
        </BorderedBox>
      </>
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
      <Column span={3}>
        <BorderedBox>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          consequuntur corrupti beatae commodi vitae, perspiciatis totam
          provident architecto doloribus aperiam sapiente, incidunt nihil
          suscipit voluptatibus tempore est dolor! Iusto, vero.
        </BorderedBox>
      </Column>
    </ColumnsSwitcher>
  );
}

Example.story = { name };
export const Comp = Example;
export default {
  title,
};

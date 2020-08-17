import React from "react";
import { ColumnsSwitcher } from "@bedrock-layout/switcher";
import {
  spacing,
  breakPoints,
  SpacingTypes,
} from "@bedrock-layout/spacing-constants";
import { Column } from "@bedrock-layout/columns";
import styled from "styled-components";
import { select, number, boolean } from "@storybook/addon-knobs";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

let title = "Switcher";
let name = "ColumnSwitcher";

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

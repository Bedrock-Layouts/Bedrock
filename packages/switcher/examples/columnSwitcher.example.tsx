import { Column } from "@bedrock-layout/columns";
import { breakPoints } from "@bedrock-layout/spacing-constants";
import { ColumnsSwitcher } from "@bedrock-layout/switcher";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

const title = "Switcher";
const name = "ColumnSwitcher";

function Example(args) {
  return (
    <ColumnsSwitcher {...args}>
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
Example.args = {
  gutter: "lg",
  dense: false,
  columns: 3,
  switchAt: breakPoints.smallOnly,
};
export const Comp = Example;
export default {
  title,
};

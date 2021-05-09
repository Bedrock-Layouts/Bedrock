import { Column } from "@bedrock-layout/columns";
import { ColumnsSwitcher, SplitSwitcher } from "@bedrock-layout/switcher";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

const title = "Switcher";
const name = "Both Switchers";

function Example(): React.ReactNode {
  return (
    <SplitSwitcher gutter="xl" fraction="1/3" switchAt="45rem">
      <BorderedBox>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </BorderedBox>
      <ColumnsSwitcher gutter="lg" switchAt="30rem" columns={3}>
        <BorderedBox>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          consequuntur corrupti beatae commodi vitae, perspiciatis totam
          provident architecto doloribus aperiam sapiente, incidunt nihil
          suscipit voluptatibus tempore est dolor! Iusto, vero.
        </BorderedBox>
        <BorderedBox>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          consequuntur corrupti beatae commodi vitae, perspiciatis totam
          provident architecto doloribus aperiam sapiente, incidunt nihil
          suscipit voluptatibus tempore est dolor! Iusto, vero.
        </BorderedBox>
        <BorderedBox>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          consequuntur corrupti beatae commodi vitae, perspiciatis totam
          provident architecto doloribus aperiam sapiente, incidunt nihil
          suscipit voluptatibus tempore est dolor! Iusto, vero.
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
    </SplitSwitcher>
  );
}

Example.story = { name };

export const Comp = Example;
export default {
  title,
};

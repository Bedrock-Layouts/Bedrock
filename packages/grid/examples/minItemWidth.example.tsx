import React from "react";
import Grid from "@bedrock-layout/grid";
import styled from "styled-components";
import { number } from "@storybook/addon-knobs";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

let title = "Grid";
let name = "minItemWidth";

function Example() {
  const minItemWidth = number("minItemWidth", 320);
  return (
    <Grid minItemWidth={minItemWidth}>
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
    </Grid>
  );
}

Example.story = { name };
export const Comp = Example;
export default {
  title,
};

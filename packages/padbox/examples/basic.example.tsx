import React from "react";
import PadBox from "@bedrock-layout/padbox";
import { spacing, SpacingTypes } from "@bedrock-layout/spacing-constants";
import styled from "styled-components";
import { select } from "@storybook/addon-knobs";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

let title = "PadBox";
let name = "Basic";

function Example() {
  const padding = select("padding", Object.keys(spacing), "lg");
  return (
    <PadBox as={BorderedBox} padding={padding as SpacingTypes}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur
      corrupti beatae commodi vitae, perspiciatis totam provident architecto
      doloribus aperiam sapiente, incidunt nihil suscipit voluptatibus tempore
      est dolor! Iusto, vero.
    </PadBox>
  );
}

Example.story = { name };
export const Comp = Example;
export default {
  title,
};

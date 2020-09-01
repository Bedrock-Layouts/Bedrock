import PadBox from "@bedrock-layout/padbox";
import { SpacingTypes, spacing } from "@bedrock-layout/spacing-constants";
import { select } from "@storybook/addon-knobs";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

const title = "PadBox";
const name = "Basic";

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

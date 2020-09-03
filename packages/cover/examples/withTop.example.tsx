import Cover from "@bedrock-layout/cover";
import { SpacingTypes, spacing } from "@bedrock-layout/spacing-constants";
import { select, text } from "@storybook/addon-knobs";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

const title = "Cover";
const name = "With Top";

function Example() {
  const minHeight = text("minHeight", "100vh");
  const gutter = select("gutter", Object.keys(spacing), "lg");
  return (
    <Cover
      minHeight={minHeight}
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

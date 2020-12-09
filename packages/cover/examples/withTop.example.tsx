import Cover from "@bedrock-layout/cover";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

const title = "Cover";
const name = "With Top";

function Example(args: Record<string, unknown>) {
  return (
    <Cover {...args} top={<div>I am on Top</div>}>
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
Example.args = {
  minHeight: "100vh",
  gutter: "lg",
};
export const Comp = Example;
export default {
  title,
};

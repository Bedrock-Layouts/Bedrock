import { Cover, CoverProps } from "@bedrock-layout/cover";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

const title = "Cover";
const name = "With bottom";
const component = Cover;

function Example(args: CoverProps): React.ReactNode {
  return (
    <Cover {...args} bottom={<div>I am on Bottom</div>}>
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
  minHeight: "50vh",
  gutter: "lg",
};

Example.storyName = name;

export const Comp = Example;

const story = {
  title: ["Components", title, name].join("/"),
  component,
};
export default story;

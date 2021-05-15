import { Inline } from "@bedrock-layout/inline";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

const title = "Inline";
const name = "Basic";
const component = Inline;

function Example(args: Record<string, unknown>): React.ReactNode {
  return (
    <Inline {...args}>
      <BorderedBox style={{ height: 100 }}>Lorem ipsum dolor</BorderedBox>
      <BorderedBox>sit amet consectetur adipisicing elit.</BorderedBox>
      <BorderedBox>Fuga consequuntur</BorderedBox>
      <BorderedBox>corrupti beatae commodi vitae</BorderedBox>
    </Inline>
  );
}

Example.story = { name };
Example.args = {
  gutter: "lg",
  justify: "start",
  align: "start",
  stretch: "end",
  switchAt: "40rem",
};

Example.storyName = name;

export const Comp = Example;

const story = {
  title: ["Components", title, name].join("/"),
  component,
};
export default story;

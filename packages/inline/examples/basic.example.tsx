import Inline from "@bedrock-layout/inline";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

const title = "Inline";
const name = "Basic";

function Example(args: Record<string, unknown>) {
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
};

export const Comp = Example;
export default {
  title,
};

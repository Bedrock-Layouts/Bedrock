import InlineCluster from "@bedrock-layout/inline-cluster";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

const title = "InlineCluster";
const name = "Basic";

function Example(args: Record<string, unknown>) {
  return (
    <InlineCluster {...args} style={{ margin: "1rem 0" }}>
      <BorderedBox style={{ height: 100 }}>Lorem ipsum dolor</BorderedBox>
      <BorderedBox>sit amet consectetur adipisicing elit.</BorderedBox>
      <BorderedBox>Fuga consequuntur</BorderedBox>
      <BorderedBox>corrupti beatae commodi vitae</BorderedBox>
    </InlineCluster>
  );
}

Example.story = { name };
Example.args = {
  gutter: "lg",
  justify: "start",
  align: "start",
};
export const Comp = Example;
export default {
  title,
};

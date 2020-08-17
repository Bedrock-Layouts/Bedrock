import React from "react";
import useContainerQuery from "@bedrock-layout/use-container-query";
import styled from "styled-components";
import { number } from "@storybook/addon-knobs";

const BorderedBox = styled.div`
  border: 1px solid black;
`;

BorderedBox.displayName = "BorderedBox";

let title = "useContainerQuery";
let name = "Basic";

function Example() {
  const width = number("width", 320);
  const [node, ref] = React.useState<HTMLDivElement | null>(null);
  const matches = useContainerQuery(node as HTMLDivElement, width);

  return (
    <BorderedBox style={{ margin: "auto", width: "50vw" }} ref={ref}>
      My Bordered Box is {matches ? "<=" : ">"} {width}px
    </BorderedBox>
  );
}

Example.story = { name };
export const Comp = Example;
export default {
  title,
};

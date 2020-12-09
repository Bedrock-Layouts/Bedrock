import useContainerQuery from "@bedrock-layout/use-container-query";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;

BorderedBox.displayName = "BorderedBox";

const title = "useContainerQuery";
const name = "Basic";

function Example({ width }) {
  const [node, ref] = React.useState<HTMLDivElement | null>(null);
  const matches = useContainerQuery(node as HTMLDivElement, width);

  return (
    <BorderedBox style={{ margin: "auto", width: "50vw" }} ref={ref}>
      My Bordered Box is {matches ? "<=" : ">"} {width}px
    </BorderedBox>
  );
}

Example.story = { name };
Example.args = {
  width: 320,
};
export const Comp = Example;
export default {
  title,
};

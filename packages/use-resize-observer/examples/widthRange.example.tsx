import useContainerQuery from "@bedrock-layout/use-container-query";
import useStatefulRef from "packages/use-stateful-ref/lib";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;

BorderedBox.displayName = "BorderedBox";

const title = "useContainerQuery";
const name = "Width Range";

function Example() {
  const ref = useStatefulRef<HTMLDivElement>(null);
  const matches = useContainerQuery(ref.current, 320, 640);

  return (
    <BorderedBox style={{ margin: "auto", width: "50vw" }} ref={ref}>
      My Bordered Box is {!matches && "not "}between 320px and 640px
    </BorderedBox>
  );
}

Example.story = { name };
export const Comp = Example;
export default {
  title,
};

import useStatefulRef from "@bedrock-layout/use-stateful-ref";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;

BorderedBox.displayName = "BorderedBox";

const title = "useStatefulRef";
const name = "Basic";

function Example() {
  const ref = useStatefulRef<HTMLDivElement>(null);
  const width = ref.current && ref.current.getBoundingClientRect().width;
  return (
    <BorderedBox ref={ref}>My Width initial width is: {width}px</BorderedBox>
  );
}

Example.story = { name };
export const Comp = Example;
export default {
  title,
};

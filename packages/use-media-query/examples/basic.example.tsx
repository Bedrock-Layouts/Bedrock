import React from "react";
import useMediaQuery from "@bedrock-layout/use-media-query";
import styled from "styled-components";
import { number } from "@storybook/addon-knobs";

const BorderedBox = styled.div`
  border: 1px solid black;
`;

BorderedBox.displayName = "BorderedBox";

let title = "useMediaQuery";
let name = "Basic";

function Example() {
  const width = number("screen-width", 640);
  const matches = useMediaQuery(`(max-width:${width}px)`);

  return (
    <BorderedBox style={{ margin: "auto", width: "50vw" }}>
      The viewport is {matches ? "<=" : ">"} {width}px
    </BorderedBox>
  );
}

Example.story = { name };
export const Comp = Example;
export default {
  title,
};

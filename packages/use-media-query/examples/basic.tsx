import useMediaQuery from "@bedrock-layout/use-media-query";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;

BorderedBox.displayName = "BorderedBox";

const title = "useMediaQuery";
const name = "Basic";

function Example({ width }) {
  const matches = useMediaQuery(`(max-width:${width}px)`);

  return (
    <BorderedBox style={{ margin: "auto", width: "50vw" }}>
      The viewport is {matches ? "<=" : ">"} {width}px
    </BorderedBox>
  );
}

Example.story = { name };
Example.args = {
  width: 640,
};
export const Comp = Example;
export default {
  title,
};

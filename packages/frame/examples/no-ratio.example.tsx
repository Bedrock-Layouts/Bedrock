import { Frame } from "@bedrock-layout/frame";
import React from "react";
import styled from "styled-components";

const Center = styled.div`
  width: 65vw;
  margin: 0 auto;
`;
Center.displayName = "Center";

const title = "Frame";
const name = "No ratio";

function Example(style: Record<string, string>): React.ReactNode {
  return (
    <Center>
      <Frame style={style}>
        <img src={`https://picsum.photos/5000`} alt="cat" />
      </Frame>
    </Center>
  );
}

Example.story = { name };
Example.args = { height: "50vh", width: "50%" };
export const Comp = Example;
export default {
  title,
};

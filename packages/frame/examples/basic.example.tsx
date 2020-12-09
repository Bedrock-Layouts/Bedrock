import Frame from "@bedrock-layout/frame";
import React from "react";
import styled from "styled-components";

const Center = styled.div`
  width: 65vw;
  margin: 0 auto;
`;
Center.displayName = "Center";

const title = "Frame";
const name = "Basic";

function Example(args: Record<string, unknown>) {
  return (
    <Center>
      <Frame {...args}>
        <img src={`https://picsum.photos/5000`} alt="cat" />
      </Frame>
    </Center>
  );
}

Example.story = { name };
Example.args = { ratio: [16, 9], position: "50% 50%" };
export const Comp = Example;
export default {
  title,
};

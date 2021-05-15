import { Frame, FrameProps } from "@bedrock-layout/frame";
import React from "react";
import styled from "styled-components";

const Center = styled.div`
  width: 65vw;
  margin: 0 auto;
`;
Center.displayName = "Center";

const title = "Frame";
const name = "Basic";
const component = Frame;

function Example({ ratio, ...args }: FrameProps): React.ReactNode {
  return (
    <Center>
      <Frame ratio={ratio as [number, number]} {...args}>
        <img src={`https://picsum.photos/5000`} alt="cat" />
      </Frame>
    </Center>
  );
}

Example.story = { name };
Example.args = { ratio: [16, 9], position: "50% 50%" };

Example.storyName = name;

export const Comp = Example;

const story = {
  title: ["Components", title, name].join("/"),
  component,
};
export default story;

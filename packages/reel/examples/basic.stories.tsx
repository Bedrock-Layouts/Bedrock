import { Reel } from "@bedrock-layout/reel";
import React from "react";
import styled from "styled-components";

const ColoredRect = styled.div`
  ${(props) => (props.color ? `background-color: ${props.color};` : "")}
  width: 100%;
  margin: 0;
  padding: 100px;
  text-align: center;
`;
ColoredRect.displayName = "ColoredRect";

const title = "Reel";
const name = "Basic";
const component = Reel;

const colors: string[] = [
  "Lavender",
  "Thistle",
  "Plum",
  "Orchid",
  "Violet",
  "Fuchsia",
  "Magenta",
  "MediumOrchid",
  "DarkOrchid",
  "DarkViolet",
  "BlueViolet",
  "DarkMagenta",
  "Purple",
  "MediumPurple",
  "MediumSlateBlue",
  "SlateBlue",
  "DarkSlateBlue",
  "RebeccaPurple",
  "Indigo",
];

function Example(args: Record<string, unknown>) {
  return (
    <Reel {...args}>
      {colors.map((color, ind) => {
        return (
          <ColoredRect key={ind} color={color}>
            Lorem ipsum dolor sit amet.{" "}
          </ColoredRect>
        );
      })}
    </Reel>
  );
}

Example.story = { name };
Example.args = {
  maxHeight: 250,
  snapX: false,
  proximity: false,
  tabIndex: "0",
};

Example.storyName = name;

export const Comp = Example;

const story = {
  title: ["Components", title, name].join("/"),
  component,
};
export default story;

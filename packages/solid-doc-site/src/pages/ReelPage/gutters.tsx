import { Reel } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";
import { colors } from "./colors";

export function Gutter(): JSXElement {
  return (
    <>
      <h3>{"size000"}</h3>
      <Reel snapType="none" gutter="size000">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size00"}</h3>
      <Reel snapType="none" gutter="size00">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size1"}</h3>
      <Reel snapType="none" gutter="size1">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size2"}</h3>
      <Reel snapType="none" gutter="size2">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size3"}</h3>
      <Reel snapType="none" gutter="size3">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size4"}</h3>
      <Reel snapType="none" gutter="size4">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size5"}</h3>
      <Reel snapType="none" gutter="size5">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size6"}</h3>
      <Reel snapType="none" gutter="size6">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size7"}</h3>
      <Reel snapType="none" gutter="size7">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size8"}</h3>
      <Reel snapType="none" gutter="size8">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size9"}</h3>
      <Reel snapType="none" gutter="size9">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size10"}</h3>
      <Reel snapType="none" gutter="size10">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size11"}</h3>
      <Reel snapType="none" gutter="size11">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size12"}</h3>
      <Reel snapType="none" gutter="size12">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size13"}</h3>
      <Reel snapType="none" gutter="size13">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size14"}</h3>
      <Reel snapType="none" gutter="size14">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size15"}</h3>
      <Reel snapType="none" gutter="size15">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
    </>
  );
}

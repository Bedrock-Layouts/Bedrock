import { Reel } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";
import { colors } from "./colors";

export function Gap(): JSXElement {
  return (
    <>
      <h3>{"size000"}</h3>
      <Reel snapType="none" gap="size000">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size00"}</h3>
      <Reel snapType="none" gap="size00">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size1"}</h3>
      <Reel snapType="none" gap="size1">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size2"}</h3>
      <Reel snapType="none" gap="size2">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size3"}</h3>
      <Reel snapType="none" gap="size3">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size4"}</h3>
      <Reel snapType="none" gap="size4">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size5"}</h3>
      <Reel snapType="none" gap="size5">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size6"}</h3>
      <Reel snapType="none" gap="size6">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size7"}</h3>
      <Reel snapType="none" gap="size7">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size8"}</h3>
      <Reel snapType="none" gap="size8">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size9"}</h3>
      <Reel snapType="none" gap="size9">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size10"}</h3>
      <Reel snapType="none" gap="size10">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size11"}</h3>
      <Reel snapType="none" gap="size11">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size12"}</h3>
      <Reel snapType="none" gap="size12">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size13"}</h3>
      <Reel snapType="none" gap="size13">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size14"}</h3>
      <Reel snapType="none" gap="size14">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
      <h3>{"size15"}</h3>
      <Reel snapType="none" gap="size15">
        {colors.map((color) => {
          return <Box bgColor={color} />;
        })}
      </Reel>
    </>
  );
}

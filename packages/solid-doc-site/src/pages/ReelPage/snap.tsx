/* eslint-disable react/style-prop-object */
import { Reel } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";
import { colors } from "./colors";

export function SnapType(): JSXElement {
  return (
    <>
      <h3>none</h3>
      <p>scroll to the right to see the next item</p>
      <Reel snapType="none" gap="size3">
        {colors.map((color) => {
          return <Box bgColor={color} style="min-width: 70%;"></Box>;
        })}
      </Reel>
      <h3>mandatory</h3>
      <p>scroll to the right to see the next item</p>
      <Reel snapType="mandatory" gap="size3">
        {colors.map((color) => {
          return <Box bgColor={color} style="min-width: 70%;"></Box>;
        })}
      </Reel>
      <h3>proximity</h3>
      <p>scroll to the right to see the next item</p>
      <Reel snapType="proximity" gap="size3">
        {colors.map((color) => {
          return <Box bgColor={color} style="min-width: 70%;"></Box>;
        })}
      </Reel>
    </>
  );
}

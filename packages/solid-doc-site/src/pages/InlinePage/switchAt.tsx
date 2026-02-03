import { Inline } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function SwitchAt(): JSXElement {
  return (
    <Inline gap="size3" minItemWidth={100} switchAt="45rem">
      <Box />
      <Box />
      <Box />
      <Box />
    </Inline>
  );
}

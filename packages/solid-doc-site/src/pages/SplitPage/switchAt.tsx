import { Split } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function SwitchAt(): JSXElement {
  return (
    <Split gap="size3" fraction="1/2" switchAt="45rem">
      <Box />
      <Box />
    </Split>
  );
}

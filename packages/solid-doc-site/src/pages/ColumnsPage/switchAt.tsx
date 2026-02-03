import { Column, Columns } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function SwitchAt(): JSXElement {
  return (
    <Columns gap="size3" colCount={3} switchAt="45rem">
      <Box />
      <Box />
      <Box />
      <Column span={3}>
        <Box />
      </Column>
    </Columns>
  );
}

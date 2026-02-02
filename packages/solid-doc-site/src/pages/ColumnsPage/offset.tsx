import { Column, Columns } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function Offset(): JSXElement {
  return (
    <Columns gap="size3" colCount={5}>
      <Box />
      <Box />
      <Column span={2} offsetStart={1}>
        <Box style={{ background: "blue" }} />
      </Column>
      <Column span={2} offsetEnd={2}>
        <Box style={{ background: "green" }} />
      </Column>
      <Box />
      <Box />
      <Box />
    </Columns>
  );
}

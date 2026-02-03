import { Column, Columns } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function Span(): JSXElement {
  return (
    <Columns gap="size3" colCount={4}>
      <Box />
      <Box />
      <Column span={3}>
        <Box style={{ background: "blue" }} />
      </Column>
      <Column span={2}>
        <Box style={{ background: "green" }} />
      </Column>
      <Box />
      <Box />
      <Box />
    </Columns>
  );
}

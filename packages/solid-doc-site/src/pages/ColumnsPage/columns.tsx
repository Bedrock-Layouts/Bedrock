import { Columns } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function ColumnsExample(): JSXElement {
  return (
    <Columns gap="size3" colCount={4}>
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </Columns>
  );
}

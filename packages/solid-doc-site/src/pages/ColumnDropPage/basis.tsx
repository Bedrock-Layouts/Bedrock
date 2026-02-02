import { ColumnDrop } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function Basis(): JSXElement {
  return (
    <ColumnDrop gap="size3" minItemWidth="15rem">
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </ColumnDrop>
  );
}

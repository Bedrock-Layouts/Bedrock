import { ColumnDrop, ColumnDropProps } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function Playground(props: Readonly<ColumnDropProps>): JSXElement {
  return (
    <ColumnDrop {...props}>
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

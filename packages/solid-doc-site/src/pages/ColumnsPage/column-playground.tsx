import { Column, ColumnProps, Columns } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function ColumnPlayground(props: Readonly<ColumnProps>): JSXElement {
  return (
    <Columns gap="size3" colCount={5}>
      <Box />
      <Box />
      <Column {...props}>
        <Box style={{ background: "blue" }} />
      </Column>
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </Columns>
  );
}

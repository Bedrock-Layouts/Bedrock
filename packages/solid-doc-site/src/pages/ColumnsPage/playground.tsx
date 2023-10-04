import { Column, Columns, ColumnsProps } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function Playground(props: Readonly<ColumnsProps>): JSXElement {
  return (
    <Columns {...props}>
      <Box />
      <Box />
      <Column span={3}>
        <Box />
      </Column>
      <Column span={2}>
        <Box />
      </Column>
      <Box />
      <Box />
      <Box />
    </Columns>
  );
}

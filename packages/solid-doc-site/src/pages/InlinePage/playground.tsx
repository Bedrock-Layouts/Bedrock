import { Inline, InlineProps } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function Playground(props: Readonly<InlineProps>): JSXElement {
  return (
    <Inline {...props}>
      <Box />
      <Box />
      <Box />
      <Box />
    </Inline>
  );
}

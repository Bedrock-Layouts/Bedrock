import { Split, SplitProps } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function Playground(props: Readonly<SplitProps>): JSXElement {
  return (
    <Split {...props}>
      <Box />
      <Box />
    </Split>
  );
}

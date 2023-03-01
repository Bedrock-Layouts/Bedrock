import { Stack, StackProps } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function Playground(props: StackProps): JSXElement {
  return (
    <Stack {...props}>
      <Box />
      <Box />
      <Box />
      <Box />
    </Stack>
  );
}

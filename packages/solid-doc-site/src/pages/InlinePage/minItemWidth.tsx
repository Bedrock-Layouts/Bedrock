import { Inline } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function MinItemWidth(): JSXElement {
  return (
    <Inline gap="size3" minItemWidth={150}>
      <Box />
      <Box />
      <Box />
      <Box />
    </Inline>
  );
}

/* eslint-disable react/style-prop-object */
import { Inline } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function ICProps(): JSXElement {
  return (
    <Inline gap="size7" justify="center" align="center">
      <Box style="height:200px;" />
      <Box />
      <Box />
      <Box />
    </Inline>
  );
}

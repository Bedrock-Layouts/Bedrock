import { Split } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function MinItemWidth(): JSXElement {
  return (
    <>
      <h3>{"With fraction of 2/3 and minItemWidth of 40ch"}</h3>
      <Split gap="size3" fraction="2/3" minItemWidth="40ch">
        <Box />
        <Box />
      </Split>
      <h3>{"With auto-start and minItemWidth of 30ch"}</h3>
      <Split gap="size3" fraction="auto-start" minItemWidth="30ch">
        <Box />
        <Box />
      </Split>
    </>
  );
}

/* eslint-disable react/style-prop-object */
import { InlineCluster, InlineClusterProps } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";

export function Playground(props: Readonly<InlineClusterProps>): JSXElement {
  return (
    <InlineCluster {...props}>
      <Box style="height:200px" widthLevel={5} />
      <Box widthLevel={0.5} />
      <Box />
      <Box widthLevel={4} />
    </InlineCluster>
  );
}

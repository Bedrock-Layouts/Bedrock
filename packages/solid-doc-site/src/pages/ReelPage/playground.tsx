/* eslint-disable react/style-prop-object */
import { Reel, ReelProps } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box } from "../../components/Box";
import { colors } from "./colors";

export function Playground(props: Readonly<ReelProps>): JSXElement {
  return (
    <Reel {...props}>
      {colors.map((color) => {
        return <Box bgColor={color} style="min-width:60%" />;
      })}
    </Reel>
  );
}

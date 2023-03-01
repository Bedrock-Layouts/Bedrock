import { Frame } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import imgSrc from "../../../../../.storybook/assets/data-pic.jpg";

export function RatioArray(): JSXElement {
  return (
    <Frame ratio={[4, 3]}>
      <img src={imgSrc} alt="computer with data" />
    </Frame>
  );
}

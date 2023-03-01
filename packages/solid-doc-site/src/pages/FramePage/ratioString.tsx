import { Frame } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import imgSrc from "../../../../../.storybook/assets/data-pic.jpg";

export function RatioString(): JSXElement {
  return (
    <Frame ratio="16/9">
      <img src={imgSrc} alt="computer with data" />
    </Frame>
  );
}

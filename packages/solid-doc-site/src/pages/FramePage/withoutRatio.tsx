import { Frame } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import imgSrc from "../../../../../.storybook/assets/data-pic.jpg";

export function WithoutRatio(): JSXElement {
  return (
    <Frame style={{ height: "50vh", width: "50%" }}>
      <img src={imgSrc} alt="computer with data" />
    </Frame>
  );
}

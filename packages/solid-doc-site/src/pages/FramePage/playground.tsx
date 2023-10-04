import { Frame, FrameProps } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import imgSrc from "../../../../../.storybook/assets/data-pic.jpg";

export function Playground(props: Readonly<FrameProps>): JSXElement {
  return (
    <Frame {...props}>
      <img src={imgSrc} alt="computer with data" />
    </Frame>
  );
}

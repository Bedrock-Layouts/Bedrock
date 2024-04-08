/* eslint-disable react/style-prop-object */
import { Cover } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

export function NoStretch(): JSXElement {
  return (
    <Cover
      minHeight="50vh"
      gutter="size1"
      variant="stretch-content"
      top={<span>I am on top.</span>}
      bottom={<span>I am on bottom.</span>}
    >
      <div style="border: 1px solid black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </div>
    </Cover>
  );
}

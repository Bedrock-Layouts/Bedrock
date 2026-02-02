/* eslint-disable react/style-prop-object */
import { Cover } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

export function StretchContent(): JSXElement {
  return (
    <Cover minHeight="50vh" gap="size1" variant="stretch-content">
      <>
        <span>I am on top.</span>
        <div style="border: 1px solid black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          consequuntur corrupti beatae commodi vitae, perspiciatis totam
          provident architecto doloribus aperiam sapiente, incidunt nihil
          suscipit voluptatibus tempore est dolor! Iusto, vero.
        </div>
        <span>I am on bottom.</span>
      </>
    </Cover>
  );
}

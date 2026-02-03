/* eslint-disable react/style-prop-object */
import { Cover } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Playground(props: any): JSXElement {
  return (
    <Cover gap={props.gap} minHeight={props.minHeight} variant={props.variant}>
      <div style="border:1px solid black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </div>
    </Cover>
  );
}

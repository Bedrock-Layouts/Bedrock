import { Cover } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

export function TopAndBottom(): JSXElement {
  return (
    <Cover
      minHeight="50vh"
      gutter="size1"
      top={<span>I am on top.</span>}
      bottom={<span>I am on bottom.</span>}
    >
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </div>
    </Cover>
  );
}

/* eslint-disable react/style-prop-object */
import { PadBox } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

export function PaddingArray(): JSXElement {
  return (
    <>
      <h3>With 2 values</h3>
      <pre>["size2", "size7"]</pre>
      <PadBox style="border: 1px solid black" padding={["size2", "size7"]}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </PadBox>
      <h3>With 3 values</h3>
      <pre>["size3", "size1", "size7"]</pre>
      <PadBox
        style="border: 1px solid black"
        padding={["size3", "size1", "size7"]}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </PadBox>
      <h3>With 4 values</h3>
      <pre>["size3", "size1", "size1", "size7"]</pre>
      <PadBox
        style="border: 1px solid black"
        padding={["size3", "size1", "size1", "size7"]}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </PadBox>
    </>
  );
}

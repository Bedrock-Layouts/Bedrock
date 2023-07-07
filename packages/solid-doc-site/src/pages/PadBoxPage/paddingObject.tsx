/* eslint-disable react/style-prop-object */
import { PadBox } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

export function PaddingObject(): JSXElement {
  return (
    <>
      <h3>With an object of values</h3>
      <pre>
        <code>
          {JSON.stringify(
            { top: "size3", inlineEnd: "size7", blockEnd: "size1" },
            null,
            3,
          )}
        </code>
      </pre>
      <PadBox
        style="border: 1px solid black"
        padding={{ top: "size3", inlineEnd: "size7", blockEnd: "size1" }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </PadBox>
    </>
  );
}

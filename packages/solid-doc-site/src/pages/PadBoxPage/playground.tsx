/* eslint-disable react/style-prop-object */
import { PadBox, PadBoxProps } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

export function Playground(props: Readonly<PadBoxProps>): JSXElement {
  return (
    <PadBox style="border: 1px solid black" {...props}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur
      corrupti beatae commodi vitae, perspiciatis totam provident architecto
      doloribus aperiam sapiente, incidunt nihil suscipit voluptatibus tempore
      est dolor! Iusto, vero.
    </PadBox>
  );
}

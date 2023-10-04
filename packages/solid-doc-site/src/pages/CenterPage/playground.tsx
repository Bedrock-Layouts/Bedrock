/* eslint-disable react/style-prop-object */
import { Center, CenterProps } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

export function Playground(props: Readonly<CenterProps>): JSXElement {
  return (
    <Center {...props} style="border: 1px solid black; width: 75%">
      <div style="width: 75%">
        Nulla luctus nisl nec dui auctor volutpat. Phasellus condimentum
        elementum enim in pharetra. Curabitur eget urna cursus, imperdiet leo
        eu, elementum leo. Proin laoreet eleifend nisl ut iaculis. Ut dictum est
        vitae rutrum elementum. Donec dictum ex ac nibh auctor semper. Phasellus
        sed rhoncus arcu, eu consectetur ipsum. Ut dictum a elit at
        sollicitudin. Quisque sed augue molestie, auctor purus quis, luctus
        ipsum. Donec ultrices vel nisi vehicula facilisis. Vestibulum cursus
        nisi tellus, sit amet sagittis nisl luctus ut.
      </div>
    </Center>
  );
}

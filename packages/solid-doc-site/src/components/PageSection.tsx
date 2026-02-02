/* eslint-disable react/style-prop-object */
import { Stack } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

export function PageSection(
  props: Readonly<{
    title: string;
    children: JSXElement;
  }>,
): JSXElement {
  return (
    <Stack gap="size3" style="max-width:80vw">
      <h2>{props.title}</h2>
      {props.children}
    </Stack>
  );
}

/* eslint-disable react/style-prop-object */
import { PadBox, Stack } from "@bedrock-layout/solid";
import dedent from "dedent";
import { JSX } from "solid-js";

import { CodeBlock } from "./CodeBlock";

export function Story(
  props: Readonly<{
    children: JSX.Element;
    code:
      | string
      | ((props: { dedent: (literals: string) => string }) => string);
  }>,
): JSX.Element {
  const finalCode =
    typeof props.code === "string" ? props.code : props.code({ dedent });

  return (
    <Stack gutter="size1">
      <Stack
        as={PadBox}
        padding="size7"
        gutter="size4"
        style="border:1px solid black"
      >
        {props.children}
        <CodeBlock code={finalCode} />
      </Stack>
    </Stack>
  );
}

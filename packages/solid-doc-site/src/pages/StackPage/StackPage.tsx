import { Stack } from "@bedrock-layout/solid";
import { JSXElement, createSignal } from "solid-js";

import { ArgsTable } from "../../components/ArgsTable";
import { Heading } from "../../components/Heading";
import { PageSection } from "../../components/PageSection";
import { Story } from "../../components/Story";
import { Align } from "./align";
import alignCode from "./align?raw";
import { argTypes } from "./argTypes";
import { Gap } from "./gaps";
import gapCode from "./gaps?raw";
import { Playground } from "./playground";
import playgroundCode from "./playground?raw";

export function StackPage(): JSXElement {
  const initialValues = Object.fromEntries(
    Object.entries(argTypes).map(([key, { initialValue }]) => [
      key,
      initialValue,
    ]),
  );
  const [props, setProps] = createSignal(initialValues);

  return (
    <Stack gap="size9">
      <Heading id="title">Stack</Heading>
      <PageSection title="Use Case">
        <p>
          The Stack is designed to literally 'stack' items on top of each other
          while maintaining a consistent gap between each item.
        </p>
      </PageSection>
      <PageSection title="API">
        <ArgsTable args={argTypes} />
      </PageSection>
      <PageSection title="gap">
        <p>
          The gap prop defines the gap size between elements. Bedrock has
          implemented a default spacing scheme, but it can be overridden with
          custom CSS length values.
        </p>

        <p>Here are the possible values for gap by default:</p>
        <Story code={gapCode}>
          <Gap />
        </Story>
      </PageSection>
      <PageSection title="align">
        <p>
          The `align` prop defines the inline alignment of the elements within
          the stack. It accepts the following values: `start`, `end`, `center`,
          `stretch`.
        </p>

        <Story code={alignCode}>
          <Align />
        </Story>
      </PageSection>
      <PageSection title="Playground">
        <Story code={playgroundCode}>
          <Playground {...props()} />
        </Story>
        <ArgsTable
          args={argTypes}
          onChange={({ propName, value }) =>
            setProps((prev) => ({ ...prev, [propName]: value }))
          }
        />
      </PageSection>
    </Stack>
  );
}

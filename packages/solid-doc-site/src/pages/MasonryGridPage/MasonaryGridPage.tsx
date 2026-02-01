import { Stack } from "@bedrock-layout/solid";
import { A } from "@solidjs/router";
import { JSXElement, createSignal } from "solid-js";

import { ArgsTable } from "../../components/ArgsTable";
import { Heading } from "../../components/Heading";
import { PageSection } from "../../components/PageSection";
import { Story } from "../../components/Story";
import { argTypes } from "./argTypes";
import { BasicUsage } from "./basicUsage";
import basicUsageCode from "./basicUsage?raw";
import { Playground } from "./playground";
import playgroundCode from "./playground?raw";

export function MasonaryGridPage(): JSXElement {
  const initialValues = Object.fromEntries(
    Object.entries(argTypes).map(([key, { initialValue }]) => [
      key,
      initialValue,
    ]),
  );
  const [props, setProps] = createSignal(initialValues);

  return (
    <Stack gutter="size9">
      <Heading id="title">Grid</Heading>
      <PageSection title="Use Case">
        <p>
          The `MasonryGrid` component is almost identical to the{" "}
          <A href="/grid">Grid component</A> except that each item's vertical
          space will grow independant of each other. The `MasonryGrid` component
          will then optimize the number of columns based on the `minItemWidth`
          prop value passed in. `MasonryGrid` does not create standard rows.
          Instead, it will optimize for the most dense layout that it can
          achieve based on the space available.
        </p>
      </PageSection>
      <PageSection title="API">
        <ArgsTable args={argTypes} />
      </PageSection>
      <PageSection title="Basic usage">
        <p>
          In the below examples, the `minItemWidth` is set to `15rem` with
          `gutter` set to `lg`. (Resize your window to see the items update.)
        </p>

        <Story code={basicUsageCode}>
          <BasicUsage />
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

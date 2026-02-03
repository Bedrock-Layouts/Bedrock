import { Stack } from "@bedrock-layout/solid";
import { JSXElement, createSignal } from "solid-js";

import { ArgsTable } from "../../components/ArgsTable";
import { Heading } from "../../components/Heading";
import { PageSection } from "../../components/PageSection";
import { Story } from "../../components/Story";
import { argTypes } from "./argTypes";
import { Fraction } from "./fractions";
import fractionCode from "./fractions?raw";
import { Gap } from "./gaps";
import gapCode from "./gaps?raw";
import { MinItemWidth } from "./minItemWidth";
import minItemWidthCode from "./minItemWidth?raw";
import { Playground } from "./playground";
import playgroundCode from "./playground?raw";
import { SwitchAt } from "./switchAt";
import switchAtCode from "./switchAt?raw";

export function SplitPage(): JSXElement {
  const initialValues = Object.fromEntries(
    Object.entries(argTypes).map(([key, { initialValue }]) => [
      key,
      initialValue,
    ]),
  );
  const [props, setProps] = createSignal(initialValues);

  return (
    <Stack gap="size9">
      <Heading id="title">Split</Heading>
      <PageSection title="Use Case">
        <p>
          The <code>Split</code> component is designed to create a split layout
          based on a fractional ratio. The <code>Split</code> component will
          enforce a standard spacing scheme through the <code>gap</code> prop
          and will optionally switch to a stack layout when the provided
          threshhold is reached.
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
      <PageSection title="fraction">
        <p>
          The <code>fraction</code> prop defines the fraction of the container
          width to use for the split. You can use the following values:
        </p>
        <Story code={fractionCode}>
          <Fraction />
        </Story>
      </PageSection>
      <PageSection title="minItemWidth">
        <p>
          The <code>minItemWidth</code> prop defines the minimum inline size of
          each child.
        </p>

        <p>
          If the minimum inline size can not be maintained, it will move to a
          stacking layout. (Resize window to observe the changes)
        </p>
        <Story code={minItemWidthCode}>
          <MinItemWidth />
        </Story>
      </PageSection>
      <PageSection title="switchAt">
        <p>
          The below example will switch the layout to stack when the width is
          less than <code>45rem</code>. (Resize your window to see this in
          action.)
        </p>
        <Story code={switchAtCode}>
          <SwitchAt />
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

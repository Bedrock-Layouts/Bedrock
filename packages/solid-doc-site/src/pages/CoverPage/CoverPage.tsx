import { Stack } from "@bedrock-layout/solid";
import { JSXElement, createSignal } from "solid-js";

import { ArgsTable } from "../../components/ArgsTable";
import { Heading } from "../../components/Heading";
import { PageSection } from "../../components/PageSection";
import { Story } from "../../components/Story";
import { argTypes } from "./argTypes";
import { Gap } from "./gaps";
import gapCode from "./gaps?raw";
import { MinHeight } from "./minHeight";
import minHeightCode from "./minHeight?raw";
import { StretchContent } from "./stretchContent";
import stretchContentCode from "./stretchContent?raw";
import { Playground } from "./playground";
import playgroundCode from "./playground?raw";

export function CoverPage(): JSXElement {
  const initialValues = Object.fromEntries(
    Object.entries(argTypes).map(([key, { initialValue }]) => [
      key,
      initialValue,
    ]),
  );
  const [props, setProps] = createSignal(initialValues);

  return (
    <Stack gap="size9">
      <Heading id="title">Cover</Heading>
      <PageSection title="Use Case">
        <p>
          The <code>Cover</code> component is designed to vertically cover a
          predefined area, 100% by default, and vertically center its children.
          Use the <code>CoverCentered</code> component to mark which child
          should be vertically centered.
        </p>
      </PageSection>
      <PageSection title="API">
        <ArgsTable args={argTypes} />
      </PageSection>
      <PageSection title="minHeight">
        <p>
          The <code>minHeight</code> prop can be used to set the minimum height
          of the cover. The default is <code>100%</code>. It can be a CSSLength,
          a number, or a key of the theme's sizes options.
        </p>

        <Story code={minHeightCode}>
          <MinHeight />
        </Story>
      </PageSection>
      <PageSection title="stretch-content">
        <p>
          You can add a stretched content variant by setting the variant props
          to stretch-content
        </p>

        <Story code={stretchContentCode}>
          <StretchContent />
        </Story>
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

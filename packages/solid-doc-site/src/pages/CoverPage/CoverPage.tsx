import { Stack } from "@bedrock-layout/solid";
import { JSXElement, createSignal } from "solid-js";

import { ArgsTable } from "../../components/ArgsTable";
import { Heading } from "../../components/Heading";
import { PageSection } from "../../components/PageSection";
import { Story } from "../../components/Story";
import { argTypes } from "./argTypes";
import { Gutter } from "./gutters";
import gutterCode from "./gutters?raw";
import { MinHeight } from "./minHeight";
import minHeightCode from "./minHeight?raw";
import { NoStretch } from "./noStretch";
import noStretchCode from "./noStretch?raw";
import { Playground } from "./playground";
import playgroundCode from "./playground?raw";
import { TopAndBottom } from "./topAndBottom";
import topAndBottomCode from "./topAndBottom?raw";

export function CoverPage(): JSXElement {
  const initialValues = Object.fromEntries(
    Object.entries(argTypes).map(([key, { initialValue }]) => [
      key,
      initialValue,
    ])
  );
  const [props, setProps] = createSignal(initialValues);

  return (
    <Stack gutter="size9">
      <Heading id="title">Cover</Heading>
      <PageSection title="Use Case">
        <p>
          The <code>Cover</code> component is designed to cover a predefined
          area, 100vh by default, and vertically center its child component. You
          can also conditionally render a top and bottom component as well.
        </p>
      </PageSection>
      <PageSection title="API">
        <ArgsTable args={argTypes} />
      </PageSection>
      <PageSection title="minHeight">
        <p>
          The `minHeight` prop can be used to set the minimum height of the
          cover. The default is `100vh`.
        </p>

        <Story code={minHeightCode}>
          <MinHeight />
        </Story>
      </PageSection>
      <PageSection title="top and bottom">
        <p>
          Both the `top` and `bottom` props can be used to render a top and
          bottom section.
        </p>

        <Story code={topAndBottomCode}>
          <TopAndBottom />
        </Story>
      </PageSection>
      <PageSection title="stretchContent">
        <p>You can also center the text by adding a centerText prop.</p>

        <Story code={noStretchCode}>
          <NoStretch />
        </Story>
      </PageSection>
      <PageSection title="gutter">
        <p>
          The gutter prop defines the gutter size between elements. Bedrock has
          implemented a default spacing scheme, but it can be overridden using
          the ThemeProvider provided by styled-components.
        </p>

        <p>Here are the possible values for gutter by default:</p>
        <Story code={gutterCode}>
          <Gutter />
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

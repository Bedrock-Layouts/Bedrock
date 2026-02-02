import { InlineClusterProps, Stack } from "@bedrock-layout/solid";
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
import { Justify } from "./justify";
import justifyCode from "./justify?raw";
import { Playground } from "./playground";
import playgroundCode from "./playground?raw";

export function InlineClusterPage(): JSXElement {
  const initialValues = Object.fromEntries(
    Object.entries(argTypes).map(([key, { initialValue }]) => [
      key,
      initialValue,
    ]),
  );
  const [props, setProps] = createSignal(initialValues);

  return (
    <Stack gap="size9">
      <Heading id="title">InlineCluster</Heading>
      <PageSection title="Use Case">
        <p>
          The `InlineCluster` component is used to display a group of elements
          in a row. When the group is too large to fit in a single row, the
          elements will be displayed in a cluster based on the width of the
          container and the justification of the cluster.
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
      <PageSection title="justify">
        <p>
          The `justify` prop defines the inline justification of the elements
          within the cluster. It accepts the following values: `start`, `end`,
          `center`.
        </p>

        <Story code={justifyCode}>
          <Justify />
        </Story>
      </PageSection>
      <PageSection title="align">
        <p>
          The `align` prop defines the block alignment of the elements within
          the cluster. It accepts the following values: `start`, `end`,
          `center`, `stretch`.
        </p>

        <Story code={alignCode}>
          <Align />
        </Story>
      </PageSection>
      <PageSection title="Playground">
        <Story code={playgroundCode}>
          <Playground {...(props() as unknown as InlineClusterProps)} />
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

import { InlineClusterProps, Stack } from "@bedrock-layout/solid";
import { A } from "@solidjs/router";
import { JSXElement, createSignal } from "solid-js";

import { ArgsTable } from "../../components/ArgsTable";
import { Heading } from "../../components/Heading";
import { PageSection } from "../../components/PageSection";
import { Story } from "../../components/Story";
import { argTypes } from "./argTypes";
import { ICProps } from "./inlineClusterProps";
import inlineClusterPropsCode from "./inlineClusterProps?raw";
import { MinItemWidth } from "./minItemWidth";
import minItemWidth from "./minItemWidth?raw";
import { Playground } from "./playground";
import playgroundCode from "./playground?raw";
import { Stretch } from "./stretch";
import stretchCode from "./stretch?raw";
import { SwitchAt } from "./switchAt";
import switchAtCode from "./switchAt?raw";

export function InlinePage(): JSXElement {
  const initialValues = Object.fromEntries(
    Object.entries(argTypes).map(([key, { initialValue }]) => [
      key,
      initialValue,
    ]),
  );
  const [props, setProps] = createSignal(initialValues);

  return (
    <Stack gap="size9">
      <Heading id="title">Inline</Heading>
      <PageSection title="Use Case">
        <p>
          The `Inline` component is designed to create consistent spacing around
          inline elements of variable width. Unlike the `InlineCluster`
          component, the items in the `Inline` component will not wrap. The
          `Inline` component also allows you to specify a component that can
          stretch and fill the excess space.
        </p>
      </PageSection>
      <PageSection title="API">
        <ArgsTable args={argTypes} />
      </PageSection>
      <PageSection title="InlineCluster Props">
        <p>
          The `Inline` component has all the same props as the `InlineCluster`
          component. (check the{" "}
          <A href="/inline-cluster">InlineCluster component for more details</A>
          )
        </p>

        <p>
          Below is an example of the `Inline` component with the `gutter` prop
          set to `xl` and both `justify` and `align` props set to `center`.
        </p>
        <Story code={inlineClusterPropsCode}>
          <ICProps />
        </Story>
      </PageSection>
      <PageSection title="stretch">
        <p>
          The `stretch` prop can be used to specify a child component that will
          stretch to fill the excess space.
        </p>

        <Story code={stretchCode}>
          <Stretch />
        </Story>
      </PageSection>
      <PageSection title="minItemWidth">
        <p>
          Some times you want all the items to have a minimum width. By setting
          the `minItemWidth` prop, you will set the minimum width of each of the
          children.
        </p>
        <p>This is especially useful with the `switchAt` prop (see below).</p>
        <p>
          In the below example, each of the boxes has an intrinsic width of
          50px. The `minItemWidth` will make them `150px` each.
        </p>

        <Story code={minItemWidth}>
          <MinItemWidth />
        </Story>
      </PageSection>
      <PageSection title="switchAt">
        <p>
          In the below example, the layout will switch to stack when its width
          becomes less than `45rem`. (Resize your window to see this in action.)
        </p>

        <Story code={switchAtCode}>
          <SwitchAt />
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

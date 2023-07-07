import { Stack } from "@bedrock-layout/solid";
import { JSXElement, createSignal } from "solid-js";

import { ArgsTable } from "../../components/ArgsTable";
import { Heading } from "../../components/Heading";
import { PageSection } from "../../components/PageSection";
import { Story } from "../../components/Story";
import { argTypes } from "./argTypes";
import { Padding } from "./padding";
import paddingCode from "./padding?raw";
import { PaddingArray } from "./paddingArray";
import paddingArrayCode from "./paddingArray?raw";
import { PaddingObject } from "./paddingObject";
import paddingObjectCode from "./paddingObject?raw";
import { Playground } from "./playground";
import playgroundCode from "./playground?raw";

export function PadBoxPage(): JSXElement {
  const initialValues = Object.fromEntries(
    Object.entries(argTypes).map(([key, { initialValue }]) => [
      key,
      initialValue,
    ]),
  );
  const [props, setProps] = createSignal(initialValues);

  return (
    <Stack gutter="size9">
      <Heading id="title">PadBox</Heading>
      <PageSection title="Use Case">
        <p>
          The `PadBox` component is designed to create consistent padding based
          on the spacing constants. PadBox takes either a single value, an array
          of values (like the css shorthand for top / right / bottom / left), or
          an object of values (specifying each side individually) for fine
          tuning the padding.
        </p>
        <p>
          Padding values can either be `SpacingOptions` defined in the theme (or
          the default bedrock `SpacingOptions`), a positive `number` of pixels,
          or a valid `CSSLength`. If you provided an invalid value (such as a
          negative number), the padding will be set to `0px`.
        </p>
      </PageSection>
      <PageSection title="API">
        <ArgsTable args={argTypes} />
      </PageSection>
      <PageSection title="padding as a single value">
        <p>
          `padding` can take a single value for a consistent box shape padding.
        </p>

        <Story code={paddingCode}>
          <Padding />
        </Story>
      </PageSection>

      <PageSection title="padding as an array">
        <p>
          `padding` can take an array that follows the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/padding">
            padding short hand rules
          </a>
          .
        </p>

        <Story code={paddingArrayCode}>
          <PaddingArray />
        </Story>
      </PageSection>

      <PageSection title="padding as an object">
        <p>
          The `padding` prop can also take an object to specify which locations
          will have padding and of which type. You can pass either traditional
          properties like `top, bottom, right, left`, or logical properties in
          camelcase such as `blockStart, blockEnd, inlineStart, inlineEnd`. No
          matter which properties are given, logical properties are used.
        </p>

        <Story code={paddingObjectCode}>
          <PaddingObject />
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
